require('dotenv').config();
const mongoose = require('mongoose');
const { Team, Student, Programme, Notification, Appeal, Gallery, Contact, Settings } = require('./models');

const DEFAULT_DB = {
  teams: [
    { id: "team-1", name: "Al Fath", captain: "Ahmad Riza", viceCaptain: "Basim K.P.", members: ["Ahmad Riza", "Faris Rahman", "Zayd Ali", "Yousuf Hasan", "Basim K.P."], totalScore: 0, rank: 1, grades: { A: 0, B: 0, C: 0 }, wins: [] },
    { id: "team-2", name: "Al Buruj", captain: "Safwan K.", viceCaptain: "Dilshad", members: ["Safwan K.", "Shamil V.P.", "Adnan Shah", "Raihan Ali", "Dilshad"], totalScore: 0, rank: 2, grades: { A: 0, B: 0, C: 0 }, wins: [] },
    { id: "team-3", name: "Al Najm", captain: "Minhaj Uddin", viceCaptain: "Anas K.", members: ["Minhaj Uddin", "Nuaim P.", "Ajmal K.T.", "Jasir M.", "Anas K."], totalScore: 0, rank: 3, grades: { A: 0, B: 0, C: 0 }, wins: [] },
    { id: "team-4", name: "Al Qalam", captain: "Luqmanul Hakeem", viceCaptain: "Sahal", members: ["Luqmanul Hakeem", "Ashraf Ali", "Ramil K.", "Hisham P.", "Sahal"], totalScore: 0, rank: 4, grades: { A: 0, B: 0, C: 0 }, wins: [] }
  ],
  students: [
    { id: "stud-1", name: "Faris Rahman", teamId: "team-1", category: "Sub Junior", photo: "" },
    { id: "stud-2", name: "Shamil V.P.", teamId: "team-2", category: "Sub Junior", photo: "" },
    { id: "stud-3", name: "Nuaim P.", teamId: "team-3", category: "Sub Junior", photo: "" },
    { id: "stud-4", name: "Ashraf Ali", teamId: "team-4", category: "Sub Junior", photo: "" },
    { id: "stud-5", name: "Zayd Ali", teamId: "team-1", category: "Junior", photo: "" },
    { id: "stud-6", name: "Adnan Shah", teamId: "team-2", category: "Junior", photo: "" },
    { id: "stud-7", name: "Ajmal K.T.", teamId: "team-3", category: "Junior", photo: "" },
    { id: "stud-8", name: "Ramil K.", teamId: "team-4", category: "Junior", photo: "" },
    { id: "stud-9", name: "Yousuf Hasan", teamId: "team-1", category: "Senior", photo: "" },
    { id: "stud-10", name: "Raihan Ali", teamId: "team-2", category: "Senior", photo: "" },
    { id: "stud-11", name: "Jasir M.", teamId: "team-3", category: "Senior", photo: "" },
    { id: "stud-12", name: "Hisham P.", teamId: "team-4", category: "Senior", photo: "" }
  ],
  programmes: [
    { id: "prog-1", name: "Quran Recitation", category: "Sub Junior", type: "individual", venue: "Imam Bukhari Stage", judge: "Usthad Hamza Musliyar", resultsPublished: false, results: [] },
    { id: "prog-2", name: "Speech", category: "Sub Junior", type: "individual", venue: "Imam Bukhari Stage", judge: "Usthad Faisal Ahsani", resultsPublished: false, results: [] },
    { id: "prog-3", name: "Mappilappattu", category: "Sub Junior", type: "individual", venue: "Imam Malik Stage", judge: "Usthad Salim Darimi", resultsPublished: false, results: [] },
    { id: "prog-4", name: "Quran Recitation", category: "Junior", type: "individual", venue: "Imam Bukhari Stage", judge: "Usthad Hamza Musliyar", resultsPublished: false, results: [] },
    { id: "prog-5", name: "Quiz", category: "Junior", type: "individual", venue: "Imam Malik Stage", judge: "Usthad Shareef Hudawi", resultsPublished: false, results: [] },
    { id: "prog-6", name: "Essay Writing", category: "Junior", type: "individual", venue: "Class Room 4", judge: "Usthad Abdul Rasheed", resultsPublished: false, results: [] },
    { id: "prog-7", name: "Speech", category: "Senior", type: "individual", venue: "Imam Malik Stage", judge: "Usthad Faisal Ahsani", resultsPublished: false, results: [] },
    { id: "prog-8", name: "Quiz", category: "Senior", type: "individual", venue: "Imam Malik Stage", judge: "Usthad Shareef Hudawi", resultsPublished: false, results: [] },
    { id: "prog-9", name: "Story Writing", category: "Senior", type: "individual", venue: "Class Room 5", judge: "Usthad Najeeb Hudawi", resultsPublished: false, results: [] }
  ],
  notifications: [
    { id: "notif-1", title: "THANAFUS Dars Fest 2026 Live", content: "Welcome to THANAFUS Dars Fest 2026. Live stage evaluations and event announcements will appear here in real time.", type: "info", date: "2026-07-03T09:00:00Z" },
    { id: "notif-2", title: "Appeal Panel Active", content: "All appeals regarding published results must be submitted within 1 hour of the official announcement.", type: "warning", date: "2026-07-03T11:30:00Z" },
    { id: "notif-3", title: "Venue Schedule Announced", content: "Events are taking place across Imam Bukhari Stage, Imam Malik Stage, and designated classrooms.", type: "info", date: "2026-07-03T13:00:00Z" }
  ],
  appeals: [
    { id: "appl-1", studentName: "Shamil V.P.", team: "Al Buruj", category: "Sub Junior", programme: "Speech", phoneNumber: "9876543210", description: "Requesting re-evaluation of my speech. I believe there was a calculation mismatch in the scoring sheet.", status: "Approved", response: "Re-evaluation completed. The rank remains unchanged, but points corrected.", date: "2026-07-03T14:00:00Z" }
  ],
  gallery: [
    { id: "gal-1", type: "image", title: "Inauguration Ceremony", url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop", day: "Day 1", category: "General", event: "Inaugural Session" },
    { id: "gal-2", type: "image", title: "Quran Recitation Sub Junior", url: "https://images.unsplash.com/photo-1584281729055-df13fb254bfb?w=800&auto=format&fit=crop", day: "Day 1", category: "Sub Junior", event: "Quran Recitation" },
    { id: "gal-3", type: "image", title: "Senior Speech Stage", url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop", day: "Day 1", category: "Senior", event: "Speech" },
    { id: "gal-4", type: "video", title: "Fest Highlights Day 1", url: "https://www.w3schools.com/html/mov_bbb.mp4", day: "Day 1", category: "General", event: "Overall Highlights" }
  ],
  contact: {
    coordinatorName: "Usthad K.M. Shafi Hudawi",
    coordinatorPhone: "+91 9988776655",
    techSupportName: "Thanafus IT Support Team",
    techSupportPhone: "+91 8877665544",
    email: "info@thanafusfest.com",
    address: "THANAFUS Dars Fest Committee Office, Markaz Campus, Calicut, Kerala, 673573"
  },
  settings: {
    prospectusUrl: "",
    adminPassword: "admin@9526"
  }
};

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Team.deleteMany({});
    await Student.deleteMany({});
    await Programme.deleteMany({});
    await Notification.deleteMany({});
    await Appeal.deleteMany({});
    await Gallery.deleteMany({});
    await Contact.deleteMany({});
    await Settings.deleteMany({});

    await Team.insertMany(DEFAULT_DB.teams);
    await Student.insertMany(DEFAULT_DB.students);
    await Programme.insertMany(DEFAULT_DB.programmes);
    await Notification.insertMany(DEFAULT_DB.notifications);
    await Appeal.insertMany(DEFAULT_DB.appeals);
    await Gallery.insertMany(DEFAULT_DB.gallery);
    await Contact.create(DEFAULT_DB.contact);
    await Settings.create(DEFAULT_DB.settings);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database', error);
    process.exit(1);
  }
}

seed();
