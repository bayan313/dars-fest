// THANAFUS Dars Fest 2026 - Shared database API
// Storage engine: a single JSON document pinned in a Telegram chat.
//
// Data-safety rules enforced here:
//  1. If the stored document cannot be read, writes are refused (HTTP 503)
//     instead of silently starting from an empty object.
//  2. A write only replaces the collections the client explicitly sent.
//  3. Stale writers (older revision) are rejected with HTTP 409.
//  4. A write that would empty an entire populated database is refused.
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8364515958:AAEIHGbuYNmpZ-oc_Q7zx-BJhkLuy1vN4ms';
  const DB_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '8003387798'; // Using the Admin's private chat as DB

  const COLLECTIONS = [
    'teams', 'students', 'programmes', 'notifications', 'appeals', 'gallery',
    'messages', 'quizzes', 'quizResponses', 'penalties', 'alumni'
  ];
  const OBJECT_COLLECTIONS = ['contact', 'settings'];
  const ALL_KEYS = COLLECTIONS.concat(OBJECT_COLLECTIONS);
  const META_KEYS = ['collections', 'revision', 'clientVerified', 'reset',
    'allowUnpublishAll', 'allowUnpublish', 'isOffline'];

  const fetchAPI = async (method, body) => {
    const response = await fetch(`https://api.telegram.org/bot${TOKEN}/${method}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    return response.json();
  };

  const fetchDocument = async (method, formData) => {
    const response = await fetch(`https://api.telegram.org/bot${TOKEN}/${method}`, {
      method: 'POST',
      body: formData
    });
    return response.json();
  };

  // Remove any control/meta keys that may have been persisted by older clients.
  const sanitize = (data) => {
    const clean = {};
    if (!data || typeof data !== 'object') return { revision: 0 };
    Object.keys(data).forEach(key => {
      if (!META_KEYS.includes(key)) clean[key] = data[key];
    });
    clean.revision = typeof data.revision === 'number' ? data.revision : 0;
    return clean;
  };

  // Read the document. Returns { revision: 0 } when nothing is stored yet, and
  // THROWS when the store is unreachable so callers never mistake a failure for
  // an empty database.
  const getDB = async () => {
    const chatRes = await fetchAPI('getChat', { chat_id: DB_CHAT_ID });
    if (!chatRes || !chatRes.ok) {
      throw new Error('Telegram getChat failed: ' + ((chatRes && chatRes.description) || 'unknown error'));
    }
    const pinned = chatRes.result && chatRes.result.pinned_message;
    if (!pinned || !pinned.document) {
      return { revision: 0 }; // Database not created yet — a valid empty state.
    }
    const fileId = pinned.document.file_id;
    const fileRes = await fetchAPI('getFile', { file_id: fileId });
    if (!fileRes || !fileRes.ok || !fileRes.result || !fileRes.result.file_path) {
      throw new Error('Telegram getFile failed: ' + ((fileRes && fileRes.description) || 'unknown error'));
    }
    const fileUrl = `https://api.telegram.org/file/bot${TOKEN}/${fileRes.result.file_path}`;
    const contentRes = await fetch(fileUrl, { cache: 'no-store' });
    if (!contentRes.ok) {
      throw new Error('Telegram DB download failed (HTTP ' + contentRes.status + ')');
    }
    const text = await contentRes.text();
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      throw new Error('Stored database is not valid JSON; refusing to overwrite it.');
    }
    return sanitize(parsed);
  };

  const coreRecordCount = (data) => {
    if (!data) return 0;
    return COLLECTIONS.reduce((sum, key) => sum + (Array.isArray(data[key]) ? data[key].length : 0), 0);
  };

  const persist = async (mergedDB) => {
    const blob = new Blob([JSON.stringify(mergedDB)], { type: 'application/json' });
    const form = new FormData();
    form.append('chat_id', DB_CHAT_ID);
    form.append('document', blob, 'database.json');
    form.append('caption', `Database Revision: ${mergedDB.revision}`);

    const sendRes = await fetchDocument('sendDocument', form);
    if (!sendRes || !sendRes.ok) {
      throw new Error('Telegram sendDocument failed: ' + ((sendRes && sendRes.description) || 'unknown error'));
    }
    const msgId = sendRes.result.message_id;

    // Pin the new message so it becomes the live database.
    await fetchAPI('pinChatMessage', { chat_id: DB_CHAT_ID, message_id: msgId });

    // Unpin the previous message if possible to keep the chat clean.
    try {
      const chatRes = await fetchAPI('getChat', { chat_id: DB_CHAT_ID });
      const prev = chatRes && chatRes.result && chatRes.result.pinned_message;
      if (prev && prev.message_id !== msgId) {
        await fetchAPI('unpinChatMessage', { chat_id: DB_CHAT_ID, message_id: prev.message_id });
      }
    } catch (e) { /* non-fatal */ }
  };

  if (req.method === 'GET') {
    try {
      const data = await getDB();
      return res.status(200).json(data);
    } catch (e) {
      // Never answer with { revision: 0 } on failure — clients treat that as an
      // empty database and may try to re-seed it.
      return res.status(503).json({ error: e.message, isOffline: true });
    }
  }

  if (req.method === 'POST') {
    const incoming = req.body || {};
    const isReset = !!incoming.reset;

    // Which collections is this client allowed to write?
    let keys;
    if (Array.isArray(incoming.collections) && incoming.collections.length > 0) {
      keys = incoming.collections.filter(k => ALL_KEYS.includes(k));
    } else {
      keys = ALL_KEYS.filter(k => incoming[k] !== undefined);
    }
    if (keys.length === 0) keys = ALL_KEYS;

    let currentDB;
    try {
      currentDB = isReset ? { revision: 0 } : await getDB();
    } catch (e) {
      // The store is unreachable: refuse the write so we cannot start from an
      // empty object and wipe the live database.
      return res.status(503).json({ error: 'Database unavailable: ' + e.message, isOffline: true });
    }

    // Optimistic concurrency: reject writers holding an older revision.
    if (!isReset && typeof incoming.revision === 'number' && incoming.revision < (currentDB.revision || 0)) {
      return res.status(409).json({
        error: `Stale page detected (server revision ${currentDB.revision}, page revision ${incoming.revision})`,
        revision: currentDB.revision
      });
    }

    const mergedDB = { ...currentDB };
    keys.forEach(key => {
      if (incoming[key] === undefined) return;
      if (Array.isArray(incoming[key])) {
        mergedDB[key] = incoming[key];
      } else if (OBJECT_COLLECTIONS.includes(key) && incoming[key] && typeof incoming[key] === 'object') {
        mergedDB[key] = { ...(mergedDB[key] || {}), ...incoming[key] };
      }
    });

    // Catastrophic-wipe guard: never let a populated database become empty.
    if (!isReset && coreRecordCount(currentDB) > 0 && coreRecordCount(mergedDB) === 0) {
      return res.status(409).json({
        error: 'Data loss protection: refused to erase all records.',
        revision: currentDB.revision
      });
    }

    META_KEYS.forEach(k => { delete mergedDB[k]; });
    mergedDB.revision = (isReset ? 0 : (currentDB.revision || 0)) + 1;

    try {
      await persist(mergedDB);
      return res.status(200).json({ success: true, revision: mergedDB.revision });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
};
