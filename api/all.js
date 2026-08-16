const { connectDB, syncAdminPassword, getAllData, Team, Student, Programme, Notification, Appeal, Gallery, Contact, Message, Settings } = require('./lib/db');

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
      const clean = stripIds(dedupe(docs));
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
    if (db.contact)       { await Contact.deleteMany({});      await Contact.create(stripIds([db.contact])[0] || {}); }
    if (db.settings)      { await Settings.deleteMany({});     await Settings.create(stripIds([db.settings])[0] || {}); await syncAdminPassword(); }
    const updated = await getAllData();
    return res.status(200).json(updated);
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
