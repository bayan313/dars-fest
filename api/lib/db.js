const mongoose = require('mongoose');

const DEFAULT_MONGO_URI = 'mongodb+srv://festweb:Ub0cEhGvvRwoRyCA@cluster0.0sx6md0.mongodb.net/dars_fest?retryWrites=true&w=majority';
const DEFAULT_ADMIN_PASSWORD = 'bayanadmin';

try {
  const path = require('path');
  require('dotenv').config({ path: path.join(__dirname, '../../.env') });
  require('dotenv').config({ path: path.join(__dirname, '../../backend/.env') });
} catch (e) {}

let cachedConn = null;

async function connectDB() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (cachedConn) return cachedConn;

  const uri = process.env.MONGO_URI || DEFAULT_MONGO_URI;

  try {
    cachedConn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 4000,
      socketTimeoutMS: 30000,
      bufferCommands: false
    });
    return cachedConn;
  } catch (err) {
    cachedConn = null;
    console.warn('MongoDB connect notice:', err.message);
    throw err;
  }
}

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

const teamSchema = new mongoose.Schema({
  siteKey: String, id: String, name: String, captain: String, viceCaptain: String,
  members: [String], totalScore: { type: Number, default: 0 },
  rank: { type: Number, default: 0 },
  grades: { A: { type: Number, default: 0 }, B: { type: Number, default: 0 }, C: { type: Number, default: 0 } },
  wins: [mongoose.Schema.Types.Mixed]
});
const studentSchema = new mongoose.Schema({ siteKey: String, id: String, name: String, chestNo: String, teamId: String, category: String, photo: String });
const resultSchema = new mongoose.Schema({ rank: Number, studentId: String, teamId: String, grade: String }, { _id: false });
const programmeSchema = new mongoose.Schema({ siteKey: String, id: String, name: String, category: String, venue: String, judge: String, type: String, teamId: String, resultsPublished: Boolean, resultsPublishedAt: String, results: [resultSchema] });
const notificationSchema = new mongoose.Schema({ siteKey: String, id: String, title: String, content: String, type: String, date: String });
const appealSchema = new mongoose.Schema({ siteKey: String, id: String, studentName: String, team: String, category: String, programme: String, phoneNumber: String, description: String, fee: { type: Number, default: 50 }, status: String, response: String, date: String });
const gallerySchema = new mongoose.Schema({ siteKey: String, id: String, type: String, title: String, url: String, day: String, category: String, event: String });
const contactSchema = new mongoose.Schema({ siteKey: String, coordinatorName: String, coordinatorPhone: String, techSupportName: String, techSupportPhone: String, email: String, address: String });
const messageSchema = new mongoose.Schema({ siteKey: String, id: String, name: String, email: String, phone: String, message: String, read: { type: Boolean, default: false }, date: String });
const settingsSchema = new mongoose.Schema({ siteKey: String, prospectusUrl: String, adminPassword: String, revision: { type: Number, default: 0 } });
const penaltySchema = new mongoose.Schema({ siteKey: String, id: String, programmeId: String, teamId: String, points: Number, reason: String });

const Team       = mongoose.models.Team       || mongoose.model('Team', teamSchema);
const Student    = mongoose.models.Student    || mongoose.model('Student', studentSchema);
const Programme  = mongoose.models.Programme  || mongoose.model('Programme', programmeSchema);
const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
const Appeal     = mongoose.models.Appeal     || mongoose.model('Appeal', appealSchema);
const Gallery    = mongoose.models.Gallery    || mongoose.model('Gallery', gallerySchema);
const Contact    = mongoose.models.Contact    || mongoose.model('Contact', contactSchema);
const Message    = mongoose.models.Message    || mongoose.model('Message', messageSchema);
const Settings   = mongoose.models.Settings   || mongoose.model('Settings', settingsSchema);
const Penalty    = mongoose.models.Penalty    || mongoose.model('Penalty', penaltySchema);

const fs = require('fs');

let cachedDefaultDb = null;
function getDefaultDb() {
  if (cachedDefaultDb) return cachedDefaultDb;
  try {
    const p1 = path.join(__dirname, '../../js/db.js');
    const p2 = path.join(__dirname, '../js/db.js');
    const dbPath = fs.existsSync(p1) ? p1 : (fs.existsSync(p2) ? p2 : null);
    if (dbPath) {
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
        if (def.settings) await Settings.create({ ...def.settings, siteKey: key, adminPassword: process.env.ADMIN_PASSWORD || 'bayanadmin', revision: 0 });
        console.log('Auto-seeded MongoDB Atlas with default data for site:', key);
      }
    }
  } catch (err) {
    console.warn('ensureDefaultData notice:', err.message);
  }
}

async function syncAdminPassword(siteKey) {
  try {
    if (mongoose.connection.readyState !== 1) return;
    const FIXED = process.env.ADMIN_PASSWORD || 'bayanadmin';
    const settings = await Settings.findOne(siteFilter(siteKey));
    if (!settings) {
      await Settings.create({ siteKey: siteKey || 'default', adminPassword: FIXED, revision: 0 });
    } else if (!settings.adminPassword) {
      settings.adminPassword = FIXED;
      await settings.save();
    }
  } catch (e) { /* silent */ }
}

async function getAllData(siteKey) {
  const filter = siteFilter(siteKey);
  const [teams, students, programmes, notifications, appeals, gallery, contact, messages, settings, penalties] = await Promise.all([
    Team.find(filter), Student.find(filter), Programme.find(filter), Notification.find(filter),
    Appeal.find(filter), Gallery.find(filter), Contact.findOne(filter), Message.find(filter), Settings.findOne(filter), Penalty.find(filter)
  ]);
  return { teams: teams || [], students: students || [], programmes: programmes || [], notifications: notifications || [], appeals: appeals || [], gallery: gallery || [], contact: contact || {}, messages: messages || [], settings: settings || { adminPassword: process.env.ADMIN_PASSWORD || 'bayanadmin', revision: 0 }, penalties: penalties || [] };
}

module.exports = { connectDB, ensureDefaultData, syncAdminPassword, getAllData, siteKeyOf, siteFilter, Team, Student, Programme, Notification, Appeal, Gallery, Contact, Message, Settings, Penalty };

