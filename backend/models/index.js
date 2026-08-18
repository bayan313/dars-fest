const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  siteKey: String,
  id: String,
  name: String,
  captain: String,
  viceCaptain: String,
  members: [String],
  totalScore: { type: Number, default: 0 },
  rank: { type: Number, default: 0 },
  grades: {
    A: { type: Number, default: 0 },
    B: { type: Number, default: 0 },
    C: { type: Number, default: 0 }
  },
  wins: [mongoose.Schema.Types.Mixed]
});

const studentSchema = new mongoose.Schema({
  siteKey: String,
  id: String,
  name: String,
  chestNo: String,
  teamId: String,
  category: String,
  photo: String
});

const resultSchema = new mongoose.Schema({
  rank: Number,
  studentId: String,
  teamId: String,
  grade: String
}, { _id: false });

const programmeSchema = new mongoose.Schema({
  siteKey: String,
  id: String,
  name: String,
  category: String,
  venue: String,
  judge: String,
  type: String,
  teamId: String,
  resultsPublished: Boolean,
  resultsPublishedAt: String,
  results: [resultSchema]
});

const notificationSchema = new mongoose.Schema({
  siteKey: String,
  id: String,
  title: String,
  content: String,
  type: String,
  date: String
});

const appealSchema = new mongoose.Schema({
  siteKey: String,
  id: String,
  studentName: String,
  team: String,
  category: String,
  programme: String,
  phoneNumber: String,
  description: String,
  fee: Number,
  status: String,
  response: String,
  date: String
});

const gallerySchema = new mongoose.Schema({
  siteKey: String,
  id: String,
  type: String,
  title: String,
  url: String,
  day: String,
  category: String,
  event: String
});

const contactSchema = new mongoose.Schema({
  siteKey: String,
  coordinatorName: String,
  coordinatorPhone: String,
  techSupportName: String,
  techSupportPhone: String,
  email: String,
  address: String
});

const messageSchema = new mongoose.Schema({
  siteKey: String,
  id: String,
  name: String,
  email: String,
  phone: String,
  message: String,
  read: { type: Boolean, default: false },
  date: String
});

const settingsSchema = new mongoose.Schema({
  siteKey: String,
  prospectusUrl: String,
  adminPassword: String,
  revision: { type: Number, default: 0 }
});

const penaltySchema = new mongoose.Schema({
  siteKey: String,
  id: String,
  programmeId: String,
  teamId: String,
  points: Number,
  reason: String
});

const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);
const Programme = mongoose.models.Programme || mongoose.model('Programme', programmeSchema);
const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
const Appeal = mongoose.models.Appeal || mongoose.model('Appeal', appealSchema);
const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', gallerySchema);
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);
const Settings = mongoose.models.Settings || mongoose.model('Settings', settingsSchema);
const Penalty = mongoose.models.Penalty || mongoose.model('Penalty', penaltySchema);

module.exports = {
  Team,
  Student,
  Programme,
  Notification,
  Appeal,
  Gallery,
  Contact,
  Message,
  Settings,
  Penalty
};
