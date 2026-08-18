require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { Team, Student, Programme, Notification, Appeal, Gallery, Contact, Message, Settings, Penalty } = require('./models');

const app = express();
// Ensure admin password in Settings matches environment variable
const ADMIN_PASSWORD_FIXED = process.env.ADMIN_PASSWORD || "admin@9526";

const syncAdminPassword = async () => {
  try {
    const settings = await Settings.findOne();
    if (!settings) {
      // Create settings if missing
      await Settings.create({ adminPassword: ADMIN_PASSWORD_FIXED });
      console.log('Created Settings with admin password');
    } else if (settings.adminPassword !== ADMIN_PASSWORD_FIXED) {
      settings.adminPassword = ADMIN_PASSWORD_FIXED;
      await settings.save();
      console.log('Updated admin password in Settings');
    }
  } catch (err) {
    console.error('Error syncing admin password:', err);
  }
};

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    syncAdminPassword();
  })
  .catch((err) => console.error('MongoDB connection error:', err));
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Prevent caching so every browser fetches the latest data
app.use('/api', (req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  next();
});

// Prevent caching of static frontend files so JS/HTML updates always reach the browser
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  next();
});

// Serve static frontend files from the parent directory
app.use(express.static(path.join(__dirname, '../')));

// Link-only projector page (extensionless URL)
app.get('/slide', (req, res) => {
  res.sendFile(path.join(__dirname, '../slide.html'));
});

// Duplicate mongoose connection removed; primary connection is established earlier with admin password sync

// Get all data
app.get('/api/all', async (req, res) => {
  await syncAdminPassword();
  const data = await getAllData();
  const settings = await Settings.findOne();
  data.revision = (settings && typeof settings.revision === 'number') ? settings.revision : 0;
  res.json(data);
});

async function getAllData() {
  const [teams, students, programmes, notifications, appeals, gallery, contact, messages, settings, penalties] = await Promise.all([
    Team.find(), Student.find(), Programme.find(), Notification.find(), Appeal.find(), Gallery.find(), Contact.findOne(), Message.find(), Settings.findOne(), Penalty.find()
  ]);
  return { teams, students, programmes, notifications, appeals, gallery, contact, messages: messages || [], settings, penalties: penalties || [] };
}

// Update all data
app.post('/api/all', async (req, res) => {
  const db = req.body;
  // Safety guard: block saves from stale clients that would wipe published results.
  // If the server currently has published results but the incoming data has none,
  // the client is almost certainly running old cached data - refuse to overwrite.
  try {
    const existingPublished = await Programme.countDocuments({ resultsPublished: true });
    const incomingPublished = Array.isArray(db.programmes)
      ? db.programmes.filter(p => p.resultsPublished).length
      : -1;
    if (!db.reset && !db.allowUnpublishAll && !db.clientVerified && !db.allowUnpublish && existingPublished > 0 && incomingPublished === 0) {
      return res.status(409).json({
        error: 'Data loss protection: the incoming data has no published results but the server has ' + existingPublished + '. Hard refresh the page (Ctrl+Shift+R) and retry.'
      });
    }
  } catch (e) {
    // If the check itself fails, proceed with the write
  }

  // Revision lock: a client must save based on the exact server revision it loaded.
  // Prevents an old tab / stale page from overwriting newer marks.
  try {
    const settings = await Settings.findOne();
    const currentRevision = (settings && typeof settings.revision === 'number') ? settings.revision : 0;
    const incomingRevision = (db && typeof db.revision === 'number') ? db.revision : null;
    if (!db.reset && incomingRevision !== null && incomingRevision !== currentRevision) {
      return res.status(409).json({
        error: 'Stale page detected (server revision ' + currentRevision + ', page revision ' + incomingRevision + '). Hard refresh (Ctrl+Shift+R) and retry - your changes were NOT saved to avoid overwriting newer data.'
      });
    }
  } catch (e) {
    // If revision check fails, proceed with the write
  }

  // Strip MongoDB _id fields sent by the client to avoid duplicate key errors
  const stripIds = (docs) => (docs || []).map(d => { const { _id, ...rest } = d; return rest; });
  // Deduplicate docs by their string id so repeated saves never accumulate copies
  const dedupe = (docs) => {
    const seen = new Set();
    return (docs || []).filter(d => {
      const key = d.id != null ? String(d.id) : JSON.stringify(d);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };
  // Atomic upsert by id: prevents duplicates even when two saves race.
  // Each doc is replaceOne-upserted (concurrent same-id writes keep one doc),
  // then docs removed from the client are deleted.
  const syncCollection = async (Model, docs) => {
    // Recursively strip _id keys from documents and subdocuments
    const cleanDocs = (docs || []).map(doc => {
      if (!doc || typeof doc !== 'object') return doc;
      const cleanDoc = JSON.parse(JSON.stringify(doc));
      const recursiveStrip = (obj) => {
        if (Array.isArray(obj)) {
          obj.forEach(item => recursiveStrip(item));
        } else if (obj && typeof obj === 'object') {
          delete obj._id;
          Object.values(obj).forEach(val => recursiveStrip(val));
        }
      };
      recursiveStrip(cleanDoc);
      return cleanDoc;
    });

    const clean = stripIds(dedupe(cleanDocs));
    const ids = clean.filter(d => d.id != null).map(d => String(d.id));
    if (clean.length > 0) {
      await Model.bulkWrite(clean.map(d => ({
        replaceOne: { filter: { id: String(d.id) }, replacement: d, upsert: true }
      })));
    }
    if (ids.length > 0) {
      await Model.deleteMany({ id: { $nin: ids } });
    }
  };
  if (db.teams) { await syncCollection(Team, db.teams); }
  if (db.students) { await syncCollection(Student, db.students); }
  if (db.programmes) { await syncCollection(Programme, db.programmes); }
  if (db.notifications) { await syncCollection(Notification, db.notifications); }
  if (db.appeals) { await syncCollection(Appeal, db.appeals); }
  if (db.gallery) { await syncCollection(Gallery, db.gallery); }
  if (db.messages) { await syncCollection(Message, db.messages); }
  if (db.penalties) { await syncCollection(Penalty, db.penalties); }
  if (db.contact) { await Contact.deleteMany({}); await Contact.create(stripIds([db.contact])[0] || {}); }
  if (db.settings) {
    // Preserve the server-side revision counter when settings are synced
    const s = stripIds([db.settings])[0] || {};
    const existing = await Settings.findOne();
    if (existing && existing.revision) s.revision = existing.revision;
    await Settings.deleteMany({});
    await Settings.create(s);
    await syncAdminPassword();
  }
  // Bump the revision so any other stale tabs get rejected on their next save
  try {
    const settings = await Settings.findOne();
    if (settings) {
      settings.revision = (settings.revision || 0) + 1;
      await settings.save();
    }
  } catch (e) { /* non-fatal */ }
  const updatedData = await getAllData();
  const settings = await Settings.findOne();
  updatedData.revision = (settings && typeof settings.revision === 'number') ? settings.revision : 0;
  res.json(updatedData);
});

// Other API Routes

// Update Routes
app.post('/api/teams', async (req, res) => {
  await Team.deleteMany({});
  await Team.insertMany(req.body);
  res.json({ message: 'Teams updated' });
});

app.post('/api/students', async (req, res) => {
  await Student.deleteMany({});
  await Student.insertMany(req.body);
  res.json({ message: 'Students updated' });
});

app.post('/api/programmes', async (req, res) => {
  await Programme.deleteMany({});
  await Programme.insertMany(req.body);
  res.json({ message: 'Programmes updated' });
});

app.post('/api/notifications', async (req, res) => {
  await Notification.deleteMany({});
  await Notification.insertMany(req.body);
  res.json({ message: 'Notifications updated' });
});

app.post('/api/appeals', async (req, res) => {
  await Appeal.deleteMany({});
  await Appeal.insertMany(req.body);
  res.json({ message: 'Appeals updated' });
});

app.post('/api/gallery', async (req, res) => {
  await Gallery.deleteMany({});
  await Gallery.insertMany(req.body);
  res.json({ message: 'Gallery updated' });
});

app.post('/api/contact', async (req, res) => {
  await Contact.deleteMany({});
  await Contact.create(req.body);
  res.json({ message: 'Contact updated' });
});

app.post('/api/settings', async (req, res) => {
  await Settings.deleteMany({});
  await Settings.create(req.body);
  res.json({ message: 'Settings updated' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
