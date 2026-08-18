const mongoose = require('mongoose');

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
}

const teamSchema = new mongoose.Schema({
  id: String, name: String, captain: String, viceCaptain: String,
  members: [String], totalScore: { type: Number, default: 0 },
  rank: { type: Number, default: 0 },
  grades: { A: { type: Number, default: 0 }, B: { type: Number, default: 0 }, C: { type: Number, default: 0 } },
  wins: [mongoose.Schema.Types.Mixed]
});
const studentSchema = new mongoose.Schema({ id: String, name: String, teamId: String, category: String, photo: String });
const resultSchema = new mongoose.Schema({ rank: Number, studentId: String, teamId: String, grade: String }, { _id: false });
const programmeSchema = new mongoose.Schema({ id: String, name: String, category: String, venue: String, judge: String, type: String, teamId: String, resultsPublished: Boolean, resultsPublishedAt: String, results: [resultSchema] });
const notificationSchema = new mongoose.Schema({ id: String, title: String, content: String, type: String, date: String });
const appealSchema = new mongoose.Schema({ id: String, studentName: String, team: String, category: String, programme: String, phoneNumber: String, description: String, status: String, response: String, date: String });
const gallerySchema = new mongoose.Schema({ id: String, type: String, title: String, url: String, day: String, category: String, event: String });
const contactSchema = new mongoose.Schema({ coordinatorName: String, coordinatorPhone: String, techSupportName: String, techSupportPhone: String, email: String, address: String });
const messageSchema = new mongoose.Schema({ id: String, name: String, email: String, phone: String, message: String, read: { type: Boolean, default: false }, date: String });
const settingsSchema = new mongoose.Schema({ prospectusUrl: String, adminPassword: String });
const penaltySchema = new mongoose.Schema({ id: String, programmeId: String, teamId: String, points: Number, reason: String });

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

async function syncAdminPassword() {
  try {
    const FIXED = process.env.ADMIN_PASSWORD || 'admin@9526';
    const settings = await Settings.findOne();
    if (!settings) {
      await Settings.create({ adminPassword: FIXED });
    } else if (settings.adminPassword !== FIXED) {
      settings.adminPassword = FIXED;
      await settings.save();
    }
  } catch (e) { /* silent */ }
}

async function getAllData() {
  const [teams, students, programmes, notifications, appeals, gallery, contact, messages, settings, penalties] = await Promise.all([
    Team.find(), Student.find(), Programme.find(), Notification.find(),
    Appeal.find(), Gallery.find(), Contact.findOne(), Message.find(), Settings.findOne(), Penalty.find()
  ]);
  return { teams, students, programmes, notifications, appeals, gallery, contact, messages: messages || [], settings, penalties: penalties || [] };
}

module.exports = { connectDB, syncAdminPassword, getAllData, Team, Student, Programme, Notification, Appeal, Gallery, Contact, Message, Settings, Penalty };
