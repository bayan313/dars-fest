const mongoose = require('mongoose');
try {
  const path = require('path');
  require('dotenv').config({ path: path.join(__dirname, '../../.env') });
  require('dotenv').config({ path: path.join(__dirname, '../../backend/.env') });
} catch (e) {}

let isConnected = false;

async function connectDB() {
  if (isConnected && mongoose.connection.readyState === 1) return;
  if (!process.env.MONGO_URI) {
    console.warn('MONGO_URI is not set in environment variables');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    });
    isConnected = true;
  } catch (err) {
    isConnected = false;
    console.error('MongoDB connectDB error:', err.message);
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

async function syncAdminPassword(siteKey) {
  try {
    if (mongoose.connection.readyState !== 1) return;
    const FIXED = process.env.ADMIN_PASSWORD || 'admin@9526';
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
  return { teams, students, programmes, notifications, appeals, gallery, contact, messages: messages || [], settings, penalties: penalties || [] };
}

module.exports = { connectDB, syncAdminPassword, getAllData, siteKeyOf, siteFilter, Team, Student, Programme, Notification, Appeal, Gallery, Contact, Message, Settings, Penalty };
