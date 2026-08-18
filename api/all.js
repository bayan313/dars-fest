const { connectDB, syncAdminPassword, getAllData, Team, Student, Programme, Notification, Appeal, Gallery, Contact, Message, Settings, Penalty } = require('./lib/db');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');

  if (req.method === 'OPTIONS') return res.status(200).end();

  await connectDB();
  await syncAdminPassword();

  if (req.method === 'GET') {
    const data = await getAllData();
    const settings = await Settings.findOne();
    data.revision = (settings && typeof settings.revision === 'number') ? settings.revision : 0;
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const db = req.body;
    // Safety guard: block stale-client saves that would wipe published results.
    const existingPublished = await Programme.countDocuments({ resultsPublished: true });
    const incomingPublished = Array.isArray(db.programmes)
      ? db.programmes.filter(p => p.resultsPublished).length
      : -1;
    if (!db.reset && !db.allowUnpublishAll && !db.clientVerified && !db.allowUnpublish && existingPublished > 0 && incomingPublished === 0) {
      return res.status(409).json({
        error: 'Data loss protection: the incoming data has no published results but the server has ' + existingPublished + '. Hard refresh the page (Ctrl+Shift+R) and retry.'
      });
    }

    // Revision check lock
    try {
      const settings = await Settings.findOne();
      const currentRevision = (settings && typeof settings.revision === 'number') ? settings.revision : 0;
      const incomingRevision = (db && typeof db.revision === 'number') ? db.revision : null;
      if (!db.reset && incomingRevision !== null && incomingRevision !== currentRevision) {
        return res.status(409).json({
          error: 'Stale page detected (server revision ' + currentRevision + ', page revision ' + incomingRevision + '). Hard refresh (Ctrl+Shift+R) and retry - your changes were NOT saved to avoid overwriting newer data.'
        });
      }
    } catch (e) {}

    const stripIds = (docs) => (docs || []).map(d => { const { _id, ...rest } = d; return rest; });
    const dedupe = (docs) => {
      const seen = new Set();
      return (docs || []).filter(d => {
        const key = d.id != null ? String(d.id) : JSON.stringify(d);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    };

    const syncCollection = async (Model, docs) => {
      // Recursively strip _id keys from documents and subdocuments to prevent Mongoose duplicate key errors
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
    if (db.contact)       { await Contact.deleteMany({});      await Contact.create(stripIds([db.contact])[0] || {}); }
    
    if (db.settings)      { 
      const s = stripIds([db.settings])[0] || {};
      const existing = await Settings.findOne();
      if (existing && existing.revision) s.revision = existing.revision;
      await Settings.deleteMany({});     
      await Settings.create(s); 
      await syncAdminPassword(); 
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
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
