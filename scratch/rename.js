const fs = require('fs');
const https = require('https');

const replacements = {
  'Patra Nirmanam': 'Newspaper Making',
  'Burdalapanam': 'Burda Recitation',
  'Bhakthi Geeth': 'Islamic Song',
  'Sambhashanam': 'Conversation',
  'Class Avatharanam': 'Class Presentation',
  'Gadhya Vayana': 'Prose Reading',
  'Kavitha Rachana Alapanam MLM': 'Poem Writing & Recitation MLM',
  'Ganam Malayalam': 'Malayalam Song',
  'Mappilappattu': 'Mappila Song',
  'Pada Sambadhanam': 'Word Building',
  'Ganam Arabic': 'Arabic Song',
  'Maalappattu': 'Maala Song',
  'Ganam Urdu': 'Urdu Song',
  'Padappattu English': 'English Poem Recitation',
  'Padappattu Arabic': 'Arabic Poem Recitation',
  'Grandha Vayana': 'Book Reading',
  'Madhura Malayalam': 'Sweet Malayalam'
};

// Update js/db.js
let content = fs.readFileSync('js/db.js', 'utf8');
for (const [oldName, newName] of Object.entries(replacements)) {
  content = content.replace(new RegExp('name: "' + oldName + '"', 'g'), 'name: "' + newName + '"');
}
fs.writeFileSync('js/db.js', content);

// Update Telegram DB
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
(async () => {
  // Fetch current
  const res = await fetch('https://thanafus-dars-fest.vercel.app/api/all?_t=' + Date.now());
  const data = await res.json();
  
  if (data.programmes) {
    data.programmes.forEach(p => {
      if (replacements[p.name]) {
        p.name = replacements[p.name];
      }
    });
  }
  
  data.revision = (data.revision || 0) + 1;
  
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  const form = new FormData();
  form.append('chat_id', '8003387798');
  form.append('document', blob, 'database.json');
  form.append('caption', 'Database Revision: ' + data.revision + ' (Renamed Programmes)');
  
  const sendRes = await fetch('https://api.telegram.org/bot8364515958:AAEIHGbuYNmpZ-oc_Q7zx-BJhkLuy1vN4ms/sendDocument', {
    method: 'POST',
    body: form
  });
  const sendData = await sendRes.json();
  
  if (sendData.ok) {
    const msgId = sendData.result.message_id;
    await fetch('https://api.telegram.org/bot8364515958:AAEIHGbuYNmpZ-oc_Q7zx-BJhkLuy1vN4ms/pinChatMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: '8003387798', message_id: msgId })
    });
    console.log('Successfully updated programmes in Telegram DB!');
  }
})();
