const fs = require('fs');

let content = fs.readFileSync('js/db.js', 'utf8');

content = content.replace(/coordinatorName: ".*?"/, 'coordinatorName: "Usthad Musthafa Baqavi"');
content = content.replace(/coordinatorPhone: ".*?"/, 'coordinatorPhone: "+91 9744597387"');
content = content.replace(/techSupportName: ".*?"/, 'techSupportName: "Thanafus IT Support Team"');
content = content.replace(/techSupportPhone: ".*?"/, 'techSupportPhone: "+91 9526919218"');
content = content.replace(/address: ".*?"/, 'address: "THANAFUS Dars Fest Committee Office, Bayan Uloom Dars, Muttichira"');

fs.writeFileSync('js/db.js', content);

// Now update Telegram DB
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
(async () => {
  try {
    const res = await fetch('https://thanafus-dars-fest.vercel.app/api/all?_t=' + Date.now());
    const data = await res.json();
    
    if (!data.contact) data.contact = {};
    data.contact.coordinatorName = "Usthad Musthafa Baqavi";
    data.contact.coordinatorPhone = "+91 9744597387";
    data.contact.techSupportName = "Thanafus IT Support Team";
    data.contact.techSupportPhone = "+91 9526919218";
    data.contact.address = "THANAFUS Dars Fest Committee Office, Bayan Uloom Dars, Muttichira";
    
    data.revision = (data.revision || 0) + 1;
    
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const form = new FormData();
    form.append('chat_id', '8003387798');
    form.append('document', blob, 'database.json');
    form.append('caption', 'Database Revision: ' + data.revision + ' (Update Contacts)');
    
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
      console.log('Successfully updated contacts in Telegram DB!');
    } else {
      console.error('Failed to update Telegram DB:', sendData);
    }
  } catch(e) {
    console.error(e);
  }
})();
