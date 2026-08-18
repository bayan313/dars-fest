const { connectDB, syncAdminPassword, getAllData, siteKeyOf, siteFilter, Team, Student, Programme, Notification, Appeal, Gallery, Contact, Message, Settings, Penalty } = require('./lib/db');

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
    await syncAdminPassword(siteKeyOf(req));
  } catch (e) {}

  const siteKey = siteKeyOf(req);

  if (req.method === 'GET') {
    try {
      const data = await getAllData(siteKey);
      const settings = data.settings || {};
      data.revision = (settings && typeof settings.revision === 'number') ? settings.revision : 0;
      data.siteKey = siteKey;
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
      if (!db.reset && !Array.isArray(db.collections)) {
        return res.status(409).json({ error: 'This browser has an outdated sync session. Refresh the page before saving again.' });
      }
      const collections = new Set(db.reset ? ['teams', 'students', 'programmes', 'notifications', 'appeals', 'gallery', 'messages', 'penalties', 'contact', 'settings'] : db.collections);
      const currentSettings = await Settings.findOne(siteFilter(siteKey));
      const clientRevision = typeof db.revision === 'number' ? db.revision : 0;
      if (!db.reset && currentSettings && clientRevision !== (currentSettings.revision || 0)) {
        return res.status(409).json({ error: 'Data was updated by another account. Refresh this page before saving to avoid overwriting those changes.' });
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
        clean.forEach(d => { if (d) d.siteKey = siteKey; });
        const ids = clean.filter(d => d.id != null).map(d => String(d.id));
        // Match both scoped docs and (for the legacy 'default' site) any docs
        // still missing a siteKey so they are adopted and upgraded on save.
        const writeFilter = (extra) => siteKey === 'default'
          ? { $or: [{ siteKey: 'default' }, { siteKey: { $exists: false } }, { siteKey: null }, { siteKey: '' }], ...extra }
          : { siteKey, ...extra };
        if (clean.length > 0) {
          await Model.bulkWrite(clean.map(d => ({
            replaceOne: { filter: writeFilter({ id: String(d.id) }), replacement: d, upsert: true }
          })));
        }
        if (ids.length > 0) {
          await Model.deleteMany(writeFilter({ id: { $nin: ids } }));
        }
      };

      if (collections.has('teams') && db.teams)                 { await syncCollection(Team, db.teams); }
      if (collections.has('students') && db.students)           { await syncCollection(Student, db.students); }
      if (collections.has('programmes') && db.programmes)       { await syncCollection(Programme, db.programmes); }
      if (collections.has('notifications') && db.notifications) { await syncCollection(Notification, db.notifications); }
      if (collections.has('appeals') && db.appeals)             { await syncCollection(Appeal, db.appeals); }
      if (collections.has('gallery') && db.gallery)             { await syncCollection(Gallery, db.gallery); }
      if (collections.has('messages') && db.messages)           { await syncCollection(Message, db.messages); }
      if (collections.has('penalties') && db.penalties)         { await syncCollection(Penalty, db.penalties); }
      
      if (collections.has('contact') && db.contact) { 
        const contact = stripIds([db.contact])[0] || {};
        contact.siteKey = siteKey;
        const contactFilter = siteKey === 'default'
          ? { $or: [{ siteKey: 'default' }, { siteKey: { $exists: false } }, { siteKey: null }, { siteKey: '' }] }
          : { siteKey };
        await Contact.deleteMany(contactFilter); 
        await Contact.create(contact); 
      }
      
      if (collections.has('settings') && db.settings) { 
        const s = stripIds([db.settings])[0] || {};
        s.siteKey = siteKey;
        const existing = await Settings.findOne(siteFilter(siteKey));
        if (existing && existing.revision) s.revision = existing.revision;
        const settingsFilter = siteKey === 'default'
          ? { $or: [{ siteKey: 'default' }, { siteKey: { $exists: false } }, { siteKey: null }, { siteKey: '' }] }
          : { siteKey };
        await Settings.deleteMany(settingsFilter);     
        await Settings.create(s); 
      }

      // Bump server revision for this site only
      try {
        const settings = await Settings.findOne(siteFilter(siteKey));
        if (settings) {
          settings.revision = (settings.revision || 0) + 1;
          await settings.save();
        }
      } catch (e) {}

      const updated = await getAllData(siteKey);
      const settings = await Settings.findOne(siteFilter(siteKey));
      updated.revision = (settings && typeof settings.revision === 'number') ? settings.revision : 0;
      updated.siteKey = siteKey;
      return res.status(200).json(updated);
    } catch (err) {
      console.error('POST /api/all error:', err.message);
      return res.status(500).json({ error: 'Failed to update database: ' + err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
