const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Team, Student, Programme, Notification, Appeal, Gallery, Contact, Message, Settings, Penalty } = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;
const ADMIN_PASSWORD_FIXED = process.env.ADMIN_PASSWORD || "bayanadmin";

// siteKey scopes every document to a single deployed site/org so multiple
// accounts can share one MongoDB without seeing each other's data.
function siteKeyOf(req) {
  if (process.env.SITE_KEY && String(process.env.SITE_KEY).trim()) {
    return String(process.env.SITE_KEY).trim();
  }
  return 'default';
}

// Match documents belonging to this site, including legacy documents created
// before site scoping existed (they belong to the 'default' site).
function siteFilter(siteKey) {
  if (!siteKey || siteKey === 'default') {
    return { $or: [{ siteKey: 'default' }, { siteKey: { $exists: false } }, { siteKey: null }] };
  }
  return { siteKey };
}

// MongoDB Connection Manager with fail-safe timeout
const mongooseOptions = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
};

let isConnecting = false;

const syncAdminPassword = async (siteKey) => {
  try {
    if (mongoose.connection.readyState !== 1) return;
    const settings = await Settings.findOne(siteFilter(siteKey));
    if (!settings) {
      await Settings.create({ siteKey: siteKey || 'default', adminPassword: ADMIN_PASSWORD_FIXED, revision: 0 });
      console.log('Created Settings with default admin password');
    } else if (!settings.adminPassword) {
      settings.adminPassword = ADMIN_PASSWORD_FIXED;
      await settings.save();
      console.log('Synchronized admin password in Settings');
    }
  } catch (err) {
    console.warn('Admin password sync notice:', err.message);
  }
};

const fs = require('fs');

let cachedDefaultDb = null;
function getDefaultDb() {
  if (cachedDefaultDb) return cachedDefaultDb;
  try {
    const dbPath = path.join(__dirname, '../js/db.js');
    if (fs.existsSync(dbPath)) {
      const code = fs.readFileSync(dbPath, 'utf8');
      cachedDefaultDb = (new Function('window', 'document', 'localStorage', 'fetch', 'BroadcastChannel', 'CustomEvent', code + '; return DEFAULT_DB;'))(
        {}, {}, { getItem: () => null, setItem: () => {} }, () => Promise.reject(), class {}, class {}
      );
      return cachedDefaultDb;
    }
  } catch (e) {}
  return null;
}

async function ensureDefaultData(siteKey) {
  try {
    if (mongoose.connection.readyState !== 1) return;
    const filter = siteFilter(siteKey);
    const count = await Team.countDocuments(filter);
    if (count === 0) {
      const def = getDefaultDb();
      if (def) {
        const key = siteKey || 'default';
        const tag = (arr) => (arr || []).map(x => ({ ...x, siteKey: key }));
        if (def.teams && def.teams.length > 0) await Team.insertMany(tag(def.teams));
        if (def.students && def.students.length > 0) await Student.insertMany(tag(def.students));
        if (def.programmes && def.programmes.length > 0) await Programme.insertMany(tag(def.programmes));
        if (def.notifications && def.notifications.length > 0) await Notification.insertMany(tag(def.notifications));
        if (def.contact) await Contact.create({ ...def.contact, siteKey: key });
        if (def.settings) await Settings.create({ ...def.settings, siteKey: key, adminPassword: ADMIN_PASSWORD_FIXED, revision: 0 });
        console.log('Auto-seeded MongoDB Atlas with default data for site:', key);
      }
    }
  } catch (err) {
    console.warn('ensureDefaultData notice:', err.message);
  }
}

const DEFAULT_MONGO_URI = 'mongodb+srv://festweb:Ub0cEhGvvRwoRyCA@cluster0.0sx6md0.mongodb.net/dars_fest?retryWrites=true&w=majority';

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return true;
  if (isConnecting) return false;
  const uri = process.env.MONGO_URI || DEFAULT_MONGO_URI;
  try {
    isConnecting = true;
    await mongoose.connect(uri, mongooseOptions);
    isConnecting = false;
    console.log('Connected to MongoDB');
    await ensureDefaultData(siteKeyOf({ headers: {} }));
    await syncAdminPassword(siteKeyOf({ headers: {} }));
    return true;
  } catch (err) {
    isConnecting = false;
    console.error('MongoDB connection error:', err.message);
    return false;
  }
};

// Initial connection attempt in background
connectDB();

app.set('case sensitive routing', false);
app.use(cors());
app.use(express.json({ limit: '15mb' }));

// Prevent caching on API responses
app.use('/api', (req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  next();
});

// Prevent caching on static frontend files
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  next();
});

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../')));

// Favicon handler to avoid 404 logs
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Clean URL Page Routes with all aliases and case insensitivity
app.get(['/admin', '/admin/', '/login', '/login/', '/admin.html', '/login.html'], (req, res) => {
  res.sendFile(path.join(__dirname, '../admin.html'));
});

app.get(['/results', '/results/', '/results.html'], (req, res) => {
  res.sendFile(path.join(__dirname, '../results.html'));
});

app.get(['/contact', '/contact/', '/contact.html'], (req, res) => {
  res.sendFile(path.join(__dirname, '../contact.html'));
});

app.get(['/slide', '/slide/', '/slide.html'], (req, res) => {
  res.sendFile(path.join(__dirname, '../slide.html'));
});

app.get(['/', '/index.html', '/home', '/home/'], (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

async function getAllData(siteKey) {
  const filter = siteFilter(siteKey);
  const [teams, students, programmes, notifications, appeals, gallery, contact, messages, settings, penalties] = await Promise.all([
    Team.find(filter), Student.find(filter), Programme.find(filter), Notification.find(filter), Appeal.find(filter), Gallery.find(filter), Contact.findOne(filter), Message.find(filter), Settings.findOne(filter), Penalty.find(filter)
  ]);
  return { 
    teams: teams || [], 
    students: students || [], 
    programmes: programmes || [], 
    notifications: notifications || [], 
    appeals: appeals || [], 
    gallery: gallery || [], 
    contact: contact || {}, 
    messages: messages || [], 
    settings: settings || { adminPassword: ADMIN_PASSWORD_FIXED, revision: 0 }, 
    penalties: penalties || [] 
  };
}

// Get all data
app.get('/api/all', async (req, res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  try {
    const siteKey = siteKeyOf(req);
    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }

    if (mongoose.connection.readyState === 1) {
      const data = await getAllData(siteKey);
      const settings = data.settings || {};
      data.revision = (settings && typeof settings.revision === 'number') ? settings.revision : 0;
      data.siteKey = siteKey;
      return res.json(data);
    } else {
      // Return fallback response with offline status so UI never hangs
      return res.status(503).json({
        error: 'Database connection not ready. Check MongoDB Atlas IP Access List (whitelist 0.0.0.0/0).',
        isOffline: true
      });
    }
  } catch (err) {
    console.error('GET /api/all error:', err.message);
    res.status(500).json({ error: 'Internal server error while fetching database' });
  }
});

// Update all data
app.post('/api/all', async (req, res) => {
  try {
    const siteKey = siteKeyOf(req);
    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        error: 'Database connection offline. Changes could not be saved to MongoDB Atlas.'
      });
    }

    const db = req.body;
    if (!db || typeof db !== 'object') {
      return res.status(400).json({ error: 'Invalid database payload' });
    }
    if (!db.reset && !Array.isArray(db.collections)) {
      return res.status(409).json({ error: 'This browser has an outdated sync session. Refresh the page before saving again.' });
    }
    const collections = new Set(db.reset ? ['teams', 'students', 'programmes', 'notifications', 'appeals', 'gallery', 'messages', 'penalties', 'contact', 'settings'] : db.collections);
    const currentSettingsBeforeSave = await Settings.findOne(siteFilter(siteKey));
    const clientRevision = typeof db.revision === 'number' ? db.revision : 0;
    if (!db.reset && currentSettingsBeforeSave && clientRevision !== (currentSettingsBeforeSave.revision || 0)) {
      return res.status(409).json({ error: 'Data was updated by another account. Refresh this page before saving to avoid overwriting those changes.' });
    }

    // Strip MongoDB _id fields sent by the client to avoid duplicate key errors
    const stripIds = (docs) => (docs || []).map(d => { 
      if (!d || typeof d !== 'object') return d;
      const { _id, ...rest } = d; 
      return rest; 
    });

    // Deduplicate docs by their string id
    const dedupe = (docs) => {
      const seen = new Set();
      return (docs || []).filter(d => {
        if (!d) return false;
        const key = d.id != null ? String(d.id) : JSON.stringify(d);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    };

    // Atomic upsert by id
    const syncCollection = async (Model, docs) => {
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
      clean.forEach(d => { if (d) d.siteKey = siteKey; });
      const ids = clean.filter(d => d.id != null).map(d => String(d.id));
      // Match both scoped docs and (for the legacy 'default' site) any docs
      // still missing a siteKey so they are adopted and upgraded on save.
      const writeFilter = (extra) => siteKey === 'default'
        ? { $or: [{ siteKey: 'default' }, { siteKey: { $exists: false } }, { siteKey: null }, { siteKey: '' }], ...extra }
        : { siteKey, ...extra };
      if (clean.length > 0) {
        await Model.bulkWrite(clean.map(d => ({
          replaceOne: { filter: writeFilter({ id: String(d.id) }), replacement: d, upsert: true }
        })));
        if (ids.length > 0) {
          await Model.deleteMany(writeFilter({ id: { $nin: ids } }));
        }
      } else {
        await Model.deleteMany(writeFilter({}));
      }
    };

    if (collections.has('teams') && db.teams)                 { await syncCollection(Team, db.teams); }
    if (collections.has('students') && db.students)           { await syncCollection(Student, db.students); }
    if (collections.has('programmes') && db.programmes)       { await syncCollection(Programme, db.programmes); }
    if (collections.has('notifications') && db.notifications) { await syncCollection(Notification, db.notifications); }
    if (collections.has('appeals') && db.appeals)             { await syncCollection(Appeal, db.appeals); }
    if (collections.has('gallery') && db.gallery)             { await syncCollection(Gallery, db.gallery); }
    if (collections.has('messages') && db.messages)           { await syncCollection(Message, db.messages); }
    if (collections.has('penalties') && db.penalties)         { await syncCollection(Penalty, db.penalties); }
    
    if (collections.has('contact') && db.contact) { 
      const contact = stripIds([db.contact])[0] || {};
      contact.siteKey = siteKey;
      const contactFilter = siteKey === 'default'
        ? { $or: [{ siteKey: 'default' }, { siteKey: { $exists: false } }, { siteKey: null }, { siteKey: '' }] }
        : { siteKey };
      await Contact.deleteMany(contactFilter); 
      await Contact.create(contact); 
    }
    
    if (collections.has('settings') && db.settings) {
      const s = stripIds([db.settings])[0] || {};
      s.siteKey = siteKey;
      const existing = await Settings.findOne(siteFilter(siteKey));
      if (existing && existing.revision) s.revision = existing.revision;
      const settingsFilter = siteKey === 'default'
        ? { $or: [{ siteKey: 'default' }, { siteKey: { $exists: false } }, { siteKey: null }, { siteKey: '' }] }
        : { siteKey };
      await Settings.deleteMany(settingsFilter);
      await Settings.create(s);
    }

    // Bump revision on save (per site)
    try {
      let settings = await Settings.findOne(siteFilter(siteKey));
      if (!settings) {
        settings = await Settings.create({ siteKey, adminPassword: ADMIN_PASSWORD_FIXED, revision: 1 });
      } else {
        settings.revision = (settings.revision || 0) + 1;
        await settings.save();
      }
    } catch (e) { /* non-fatal */ }

    const updatedData = await getAllData(siteKey);
    const currentSettings = await Settings.findOne(siteFilter(siteKey));
    updatedData.revision = (currentSettings && typeof currentSettings.revision === 'number') ? currentSettings.revision : 0;
    updatedData.siteKey = siteKey;
    res.json(updatedData);
  } catch (err) {
    console.error('POST /api/all error:', err.message);
    res.status(500).json({ error: 'Failed to update database: ' + err.message });
  }
});

// Specific Collection Update Routes
app.post('/api/teams', async (req, res) => {
  try {
    const siteKey = siteKeyOf(req);
    await connectDB();
    const docs = (req.body || []).map(d => d && typeof d === 'object' ? { ...d, siteKey } : d);
    await Team.deleteMany({ siteKey });
    await Team.insertMany(docs);
    res.json({ message: 'Teams updated' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/students', async (req, res) => {
  try {
    const siteKey = siteKeyOf(req);
    await connectDB();
    const docs = (req.body || []).map(d => d && typeof d === 'object' ? { ...d, siteKey } : d);
    await Student.deleteMany({ siteKey });
    await Student.insertMany(docs);
    res.json({ message: 'Students updated' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/programmes', async (req, res) => {
  try {
    const siteKey = siteKeyOf(req);
    await connectDB();
    const docs = (req.body || []).map(d => d && typeof d === 'object' ? { ...d, siteKey } : d);
    await Programme.deleteMany({ siteKey });
    await Programme.insertMany(docs);
    res.json({ message: 'Programmes updated' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/notifications', async (req, res) => {
  try {
    const siteKey = siteKeyOf(req);
    await connectDB();
    const docs = (req.body || []).map(d => d && typeof d === 'object' ? { ...d, siteKey } : d);
    await Notification.deleteMany({ siteKey });
    await Notification.insertMany(docs);
    res.json({ message: 'Notifications updated' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/appeals', async (req, res) => {
  try {
    const siteKey = siteKeyOf(req);
    await connectDB();
    const docs = (req.body || []).map(d => d && typeof d === 'object' ? { ...d, siteKey } : d);
    await Appeal.deleteMany({ siteKey });
    await Appeal.insertMany(docs);
    res.json({ message: 'Appeals updated' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/gallery', async (req, res) => {
  try {
    const siteKey = siteKeyOf(req);
    await connectDB();
    const docs = (req.body || []).map(d => d && typeof d === 'object' ? { ...d, siteKey } : d);
    await Gallery.deleteMany({ siteKey });
    await Gallery.insertMany(docs);
    res.json({ message: 'Gallery updated' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const siteKey = siteKeyOf(req);
    await connectDB();
    const body = { ...(req.body || {}), siteKey };
    await Contact.deleteMany({ siteKey });
    await Contact.create(body);
    res.json({ message: 'Contact updated' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/settings', async (req, res) => {
  try {
    const siteKey = siteKeyOf(req);
    await connectDB();
    const body = { ...(req.body || {}), siteKey };
    await Settings.deleteMany({ siteKey });
    await Settings.create(body);
    res.json({ message: 'Settings updated' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// SPA Fallback: Unknown frontend GET routes serve index.html
app.get('/*splat', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Endpoint not found' });
  }
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    require('./bot.js');
    console.log('Telegram Bot service active alongside Express server');
  } catch (err) {
    console.warn('Telegram Bot startup notice:', err.message);
  }
});
