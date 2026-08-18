require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { Team, Student, Programme, Notification, Appeal, Gallery, Contact, Message, Settings, Penalty } = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;
const ADMIN_PASSWORD_FIXED = process.env.ADMIN_PASSWORD || "admin@9526";

// MongoDB Connection Manager with fail-safe timeout
const mongooseOptions = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
};

let isConnecting = false;

const syncAdminPassword = async () => {
  try {
    if (mongoose.connection.readyState !== 1) return;
    const settings = await Settings.findOne();
    if (!settings) {
      await Settings.create({ adminPassword: ADMIN_PASSWORD_FIXED, revision: 0 });
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

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return true;
  if (isConnecting) return false;
  if (!process.env.MONGO_URI) {
    console.warn('⚠️ MONGO_URI is missing from environment variables.');
    return false;
  }
  try {
    isConnecting = true;
    await mongoose.connect(process.env.MONGO_URI, mongooseOptions);
    isConnecting = false;
    console.log('Connected to MongoDB');
    await syncAdminPassword();
    return true;
  } catch (err) {
    isConnecting = false;
    console.error('MongoDB connection error:', err.message);
    return false;
  }
};

// Initial connection attempt in background
connectDB();

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

// Projector slide page URL
app.get('/slide', (req, res) => {
  res.sendFile(path.join(__dirname, '../slide.html'));
});

async function getAllData() {
  const [teams, students, programmes, notifications, appeals, gallery, contact, messages, settings, penalties] = await Promise.all([
    Team.find(), Student.find(), Programme.find(), Notification.find(), Appeal.find(), Gallery.find(), Contact.findOne(), Message.find(), Settings.findOne(), Penalty.find()
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
  try {
    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }

    if (mongoose.connection.readyState === 1) {
      const data = await getAllData();
      const settings = data.settings || {};
      data.revision = (settings && typeof settings.revision === 'number') ? settings.revision : 0;
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
    const currentSettingsBeforeSave = await Settings.findOne();
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

    if (collections.has('teams') && db.teams)                 { await syncCollection(Team, db.teams); }
    if (collections.has('students') && db.students)           { await syncCollection(Student, db.students); }
    if (collections.has('programmes') && db.programmes)       { await syncCollection(Programme, db.programmes); }
    if (collections.has('notifications') && db.notifications) { await syncCollection(Notification, db.notifications); }
    if (collections.has('appeals') && db.appeals)             { await syncCollection(Appeal, db.appeals); }
    if (collections.has('gallery') && db.gallery)             { await syncCollection(Gallery, db.gallery); }
    if (collections.has('messages') && db.messages)           { await syncCollection(Message, db.messages); }
    if (collections.has('penalties') && db.penalties)         { await syncCollection(Penalty, db.penalties); }
    
    if (collections.has('contact') && db.contact) { 
      await Contact.deleteMany({}); 
      await Contact.create(stripIds([db.contact])[0] || {}); 
    }
    
    if (collections.has('settings') && db.settings) {
      const s = stripIds([db.settings])[0] || {};
      const existing = await Settings.findOne();
      if (existing && existing.revision) s.revision = existing.revision;
      await Settings.deleteMany({});
      await Settings.create(s);
    }

    // Bump revision on save
    try {
      let settings = await Settings.findOne();
      if (!settings) {
        settings = await Settings.create({ adminPassword: ADMIN_PASSWORD_FIXED, revision: 1 });
      } else {
        settings.revision = (settings.revision || 0) + 1;
        await settings.save();
      }
    } catch (e) { /* non-fatal */ }

    const updatedData = await getAllData();
    const currentSettings = await Settings.findOne();
    updatedData.revision = (currentSettings && typeof currentSettings.revision === 'number') ? currentSettings.revision : 0;
    res.json(updatedData);
  } catch (err) {
    console.error('POST /api/all error:', err.message);
    res.status(500).json({ error: 'Failed to update database: ' + err.message });
  }
});

// Specific Collection Update Routes
app.post('/api/teams', async (req, res) => {
  try {
    await connectDB();
    await Team.deleteMany({});
    await Team.insertMany(req.body);
    res.json({ message: 'Teams updated' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/students', async (req, res) => {
  try {
    await connectDB();
    await Student.deleteMany({});
    await Student.insertMany(req.body);
    res.json({ message: 'Students updated' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/programmes', async (req, res) => {
  try {
    await connectDB();
    await Programme.deleteMany({});
    await Programme.insertMany(req.body);
    res.json({ message: 'Programmes updated' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/notifications', async (req, res) => {
  try {
    await connectDB();
    await Notification.deleteMany({});
    await Notification.insertMany(req.body);
    res.json({ message: 'Notifications updated' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/appeals', async (req, res) => {
  try {
    await connectDB();
    await Appeal.deleteMany({});
    await Appeal.insertMany(req.body);
    res.json({ message: 'Appeals updated' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/gallery', async (req, res) => {
  try {
    await connectDB();
    await Gallery.deleteMany({});
    await Gallery.insertMany(req.body);
    res.json({ message: 'Gallery updated' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    await connectDB();
    await Contact.deleteMany({});
    await Contact.create(req.body);
    res.json({ message: 'Contact updated' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/settings', async (req, res) => {
  try {
    await connectDB();
    await Settings.deleteMany({});
    await Settings.create(req.body);
    res.json({ message: 'Settings updated' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
