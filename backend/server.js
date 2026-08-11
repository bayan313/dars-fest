require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { Team, Student, Programme, Notification, Appeal, Gallery, Contact, Settings } = require('./models');

const app = express();
// Ensure admin password in Settings matches environment variable
const ADMIN_PASSWORD_FIXED = "admin@9526";

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

// Duplicate mongoose connection removed; primary connection is established earlier with admin password sync

// Get all data
app.get('/api/all', async (req, res) => {
  await syncAdminPassword();
  const data = await getAllData();
  res.json(data);
});

// Helper to fetch all collections
async function getAllData() {
  const [teams, students, programmes, notifications, appeals, gallery, contact, settings] = await Promise.all([
    Team.find(), Student.find(), Programme.find(), Notification.find(), Appeal.find(), Gallery.find(), Contact.findOne(), Settings.findOne()
  ]);
  return { teams, students, programmes, notifications, appeals, gallery, contact, settings };
}

// Update all data
app.post('/api/all', async (req, res) => {
  const db = req.body;
  // Strip MongoDB _id fields sent by the client to avoid duplicate key errors on insertMany
  const stripIds = (docs) => (docs || []).map(d => { const { _id, ...rest } = d; return rest; });
  if (db.teams) { await Team.deleteMany({}); await Team.insertMany(stripIds(db.teams)); }
  if (db.students) { await Student.deleteMany({}); await Student.insertMany(stripIds(db.students)); }
  if (db.programmes) { await Programme.deleteMany({}); await Programme.insertMany(stripIds(db.programmes)); }
  if (db.notifications) { await Notification.deleteMany({}); await Notification.insertMany(stripIds(db.notifications)); }
  if (db.appeals) { await Appeal.deleteMany({}); await Appeal.insertMany(stripIds(db.appeals)); }
  if (db.gallery) { await Gallery.deleteMany({}); await Gallery.insertMany(stripIds(db.gallery)); }
  if (db.contact) { await Contact.deleteMany({}); await Contact.create(stripIds([db.contact])[0] || db.contact); }
  if (db.settings) { await Settings.deleteMany({}); await Settings.create(stripIds([db.settings])[0] || db.settings); await syncAdminPassword(); }
  const updatedData = await getAllData();
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
