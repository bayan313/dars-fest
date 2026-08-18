const { connectDB, syncAdminPassword, getAllData, Team, Student, Programme, Notification, Appeal, Gallery, Contact, Message, Settings, Penalty } = require('./lib/db');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    await connectDB();
  } catch (err) {
    return res.status(503).json({ error: 'Database connection failed', isOffline: true });
  }

  try {
    await syncAdminPassword();
  } catch (e) {}

  if (req.method === 'GET') {
    try {
      const data = await getAllData();
      const settings = data.settings || {};
      data.revision = (settings && typeof settings.revision === 'number') ? settings.revision : 0;
      return res.status(200).json(data);
    } catch (err) {
      console.error('GET /api/all error:', err.message);
      return res.status(500).json({ error: 'Failed to fetch database: ' + err.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const db = req.body;
      if (!db || typeof db !== 'object') {
        return res.status(400).json({ error: 'Invalid database payload' });
      }

      const stripIds = (docs) => (docs || []).map(d => { 
        if (!d || typeof d !== 'object') return d;
        const { _id, ...rest } = d; 
        return rest; 
      });

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

      if (db.teams)         { await syncCollection(Team, db.teams); }
      if (db.students)      { await syncCollection(Student, db.students); }
      if (db.programmes)    { await syncCollection(Programme, db.programmes); }
      if (db.notifications) { await syncCollection(Notification, db.notifications); }
      if (db.appeals)       { await syncCollection(Appeal, db.appeals); }
      if (db.gallery)       { await syncCollection(Gallery, db.gallery); }
      if (db.messages)      { await syncCollection(Message, db.messages); }
      if (db.penalties)     { await syncCollection(Penalty, db.penalties); }
      
      if (db.contact) { 
        await Contact.deleteMany({}); 
        await Contact.create(stripIds([db.contact])[0] || {}); 
      }
      
      if (db.settings) { 
        const s = stripIds([db.settings])[0] || {};
        const existing = await Settings.findOne();
        if (existing && existing.revision) s.revision = existing.revision;
        await Settings.deleteMany({});     
        await Settings.create(s); 
      }

      // Bump server revision
      try {
        const settings = await Settings.findOne();
        if (settings) {
          settings.revision = (settings.revision || 0) + 1;
          await settings.save();
        }
      } catch (e) {}

      const updated = await getAllData();
      const settings = await Settings.findOne();
      updated.revision = (settings && typeof settings.revision === 'number') ? settings.revision : 0;
      return res.status(200).json(updated);
    } catch (err) {
      console.error('POST /api/all error:', err.message);
      return res.status(500).json({ error: 'Failed to update database: ' + err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
