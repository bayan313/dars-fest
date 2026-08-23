module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const TOKEN = '8364515958:AAEIHGbuYNmpZ-oc_Q7zx-BJhkLuy1vN4ms';
  const DB_CHAT_ID = '8003387798'; // Using the Admin's private chat as DB
  
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

  const getDB = async () => {
    try {
      const chatRes = await fetchAPI('getChat', { chat_id: DB_CHAT_ID });
      if (chatRes.ok && chatRes.result.pinned_message && chatRes.result.pinned_message.document) {
        const fileId = chatRes.result.pinned_message.document.file_id;
        const fileRes = await fetchAPI('getFile', { file_id: fileId });
        if (fileRes.ok) {
          const fileUrl = `https://api.telegram.org/file/bot${TOKEN}/${fileRes.result.file_path}`;
          const contentRes = await fetch(fileUrl);
          return await contentRes.json();
        }
      }
    } catch(e) {}
    return { revision: 0 };
  };

  if (req.method === 'GET') {
    const data = await getDB();
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    try {
      const currentDB = await getDB();
      const incoming = req.body || {};
      
      const mergedDB = { ...currentDB };
      Object.keys(incoming).forEach(key => {
        if (Array.isArray(incoming[key])) {
          // Client sends full array for changed collections
          mergedDB[key] = incoming[key];
        } else if (typeof incoming[key] === 'object') {
          mergedDB[key] = { ...(mergedDB[key]||{}), ...incoming[key] };
        } else {
          mergedDB[key] = incoming[key];
        }
      });
      
      mergedDB.revision = (mergedDB.revision || 0) + 1;
      
      const blob = new Blob([JSON.stringify(mergedDB)], { type: 'application/json' });
      const form = new FormData();
      form.append('chat_id', DB_CHAT_ID);
      form.append('document', blob, 'database.json');
      form.append('caption', `Database Revision: ${mergedDB.revision}`);
      
      const sendRes = await fetchDocument('sendDocument', form);
      
      if (sendRes.ok) {
        const msgId = sendRes.result.message_id;
        
        // Pin the new message
        await fetchAPI('pinChatMessage', { chat_id: DB_CHAT_ID, message_id: msgId });
        
        // Unpin previous message if possible to keep it clean
        const chatRes = await fetchAPI('getChat', { chat_id: DB_CHAT_ID });
        if (chatRes.ok && chatRes.result.pinned_message && chatRes.result.pinned_message.message_id !== msgId) {
           await fetchAPI('unpinChatMessage', { chat_id: DB_CHAT_ID, message_id: chatRes.result.pinned_message.message_id });
        }
      }
      
      return res.status(200).json({ success: true, revision: mergedDB.revision });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
};
