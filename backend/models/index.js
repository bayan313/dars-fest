const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
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
  id: String,
  name: String,
  teamId: String,
  category: String,
  photo: String
});

const resultSchema = new mongoose.Schema({
  rank: Number,
  studentId: String,
  grade: String
});

const programmeSchema = new mongoose.Schema({
  id: String,
  name: String,
  category: String,
  venue: String,
  judge: String,
  resultsPublished: Boolean,
  results: [resultSchema]
});

const notificationSchema = new mongoose.Schema({
  id: String,
  title: String,
  content: String,
  type: String,
  date: String
});

const appealSchema = new mongoose.Schema({
  id: String,
  studentName: String,
  team: String,
  category: String,
  programme: String,
  phoneNumber: String,
  description: String,
  status: String,
  response: String,
  date: String
});

const gallerySchema = new mongoose.Schema({
  id: String,
  type: String,
  title: String,
  url: String,
  day: String,
  category: String,
  event: String
});

const contactSchema = new mongoose.Schema({
  coordinatorName: String,
  coordinatorPhone: String,
  techSupportName: String,
  techSupportPhone: String,
  email: String,
  address: String
});

const settingsSchema = new mongoose.Schema({
  prospectusUrl: String,
  adminPassword: String
});

const Team = mongoose.model('Team', teamSchema);
const Student = mongoose.model('Student', studentSchema);
const Programme = mongoose.model('Programme', programmeSchema);
const Notification = mongoose.model('Notification', notificationSchema);
const Appeal = mongoose.model('Appeal', appealSchema);
const Gallery = mongoose.model('Gallery', gallerySchema);
const Contact = mongoose.model('Contact', contactSchema);
const Settings = mongoose.model('Settings', settingsSchema);

module.exports = {
  Team,
  Student,
  Programme,
  Notification,
  Appeal,
  Gallery,
  Contact,
  Settings
};
