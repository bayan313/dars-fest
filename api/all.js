const { connectDB, syncAdminPassword, getAllData, Team, Student, Programme, Notification, Appeal, Gallery, Contact, Settings } = require('./lib/db');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');

  if (req.method === 'OPTIONS') return res.status(200).end();

  await connectDB();

  if (req.method === 'GET') {
    const data = await getAllData();
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const db = req.body;
    if (db.teams)         { await Team.deleteMany({});         await Team.insertMany(db.teams); }
    if (db.students)      { await Student.deleteMany({});      await Student.insertMany(db.students); }
    if (db.programmes)    { await Programme.deleteMany({});    await Programme.insertMany(db.programmes); }
    if (db.notifications) { await Notification.deleteMany({}); await Notification.insertMany(db.notifications); }
    if (db.appeals)       { await Appeal.deleteMany({});       await Appeal.insertMany(db.appeals); }
    if (db.gallery)       { await Gallery.deleteMany({});      await Gallery.insertMany(db.gallery); }
    if (db.contact)       { await Contact.deleteMany({});      await Contact.create(db.contact); }
    if (db.settings)      { await Settings.deleteMany({});     await Settings.create(db.settings); await syncAdminPassword(); }
    const updated = await getAllData();
    return res.status(200).json(updated);
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
