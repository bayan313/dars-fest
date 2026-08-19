const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const fs = require('fs');
const mongoose = require('mongoose');
const { Team, Student, Programme, Notification, Appeal, Gallery, Contact, Settings, Penalty } = require('./models');

let DEFAULT_DB;
try {
  const dbJsPath = path.join(__dirname, '../js/db.js');
  const code = fs.readFileSync(dbJsPath, 'utf8');
  DEFAULT_DB = (new Function('window', 'document', 'localStorage', 'fetch', code + '; return DEFAULT_DB;'))(
    {}, {}, { getItem: () => null, setItem: () => {} }, () => Promise.reject(new Error('offline'))
  );
} catch (e) {
  console.warn('Could not extract DEFAULT_DB from js/db.js, using fallback:', e.message);
  DEFAULT_DB = {
    teams: [
      { id: "team-1", name: "Sabha", captain: "Unais", viceCaptain: "Mukthar", members: ["Unais", "Mukthar", "Shahin Ali", "Ashraf", "Sadeed", "Aadil"], totalScore: 0, rank: 1, grades: { A: 0, B: 0, C: 0 }, wins: [] },
      { id: "team-2", name: "Lizaz", captain: "Adnan", viceCaptain: "Rasmil", members: ["Adnan", "Rasmil", "Basith", "Marvan", "Amjad", "Nihad"], totalScore: 0, rank: 2, grades: { A: 0, B: 0, C: 0 }, wins: [] },
      { id: "team-3", name: "Laheef", captain: "Sinan vp", viceCaptain: "Syd mushab", members: ["Sinan vp", "Syd mushab", "Muheenudheen", "Ajmal nasim", "Rasheq", "Rashid p"], totalScore: 0, rank: 3, grades: { A: 0, B: 0, C: 0 }, wins: [] },
      { id: "team-4", name: "Murthajiz", captain: "Rishad MP", viceCaptain: "Junaid", members: ["Rishad MP", "Junaid", "Nashan", "Sayyid Dilshan", "Jamal", "Sayyid Shafeeh", "Shabeeb"], totalScore: 0, rank: 4, grades: { A: 0, B: 0, C: 0 }, wins: [] }
    ],
    students: [],
    programmes: [],
    notifications: [],
    appeals: [],
    gallery: [],
    contact: { coordinatorName: "Usthad K.M. Shafi Hudawi", coordinatorPhone: "+91 9988776655", techSupportName: "Thanafus IT Support Team", techSupportPhone: "+91 8877665544", email: "info@thanafusfest.com", address: "THANAFUS Dars Fest Committee Office" },
    settings: { prospectusUrl: "", adminPassword: process.env.ADMIN_PASSWORD || "bayanadmin" }
  };
}

if (!DEFAULT_DB.settings) DEFAULT_DB.settings = {};
DEFAULT_DB.settings.adminPassword = process.env.ADMIN_PASSWORD || "bayanadmin";

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const siteKey = (process.env.SITE_KEY && String(process.env.SITE_KEY).trim()) ? String(process.env.SITE_KEY).trim() : 'default';
    const tag = (docs) => (docs || []).map(d => ({ ...d, siteKey }));

    await Team.deleteMany({ siteKey });
    await Student.deleteMany({ siteKey });
    await Programme.deleteMany({ siteKey });
    await Notification.deleteMany({ siteKey });
    await Appeal.deleteMany({ siteKey });
    await Gallery.deleteMany({ siteKey });
    await Contact.deleteMany({ siteKey });
    await Settings.deleteMany({ siteKey });
    await Penalty.deleteMany({ siteKey });

    await Team.insertMany(tag(DEFAULT_DB.teams));
    await Student.insertMany(tag(DEFAULT_DB.students));
    await Programme.insertMany(tag(DEFAULT_DB.programmes));
    await Notification.insertMany(tag(DEFAULT_DB.notifications));
    await Appeal.insertMany(tag(DEFAULT_DB.appeals));
    await Gallery.insertMany(tag(DEFAULT_DB.gallery));
    await Contact.create({ ...DEFAULT_DB.contact, siteKey });
    await Settings.create({ ...DEFAULT_DB.settings, siteKey });

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database', error);
    process.exit(1);
  }
}

seed();
