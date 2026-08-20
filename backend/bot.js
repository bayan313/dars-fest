const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');
const { Team, Student, Programme, Notification, Appeal, Gallery, Contact, Message, Settings, Penalty } = require('./models');

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'bayanadmin';
const MONGO_URI = process.env.MONGO_URI;

if (!TOKEN) { console.error('TELEGRAM_BOT_TOKEN missing'); process.exit(1); }
if (!MONGO_URI) { console.error('MONGO_URI missing'); process.exit(1); }

const bot = new TelegramBot(TOKEN, { polling: true });
const adminSessions = new Map();
const pendingActions = new Map();

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    console.log('MongoDB connected');
    return true;
  } catch (err) {
    console.error('MongoDB error:', err.message);
    return false;
  }
}

function siteFilter(siteKey) {
  if (!siteKey || siteKey === 'default') {
    return { $or: [{ siteKey: 'default' }, { siteKey: { $exists: false } }, { siteKey: null }] };
  }
  return { siteKey };
}

function isAdmin(chatId) { return adminSessions.get(chatId) === true; }

function escapeMd(text) {
  return String(text || '').replace(/[_*\[\]()~`>#+\-=|{}.!\\]/g, '\\$&');
}

function splitMsg(text, maxLen = 4000) {
  if (text.length <= maxLen) return [text];
  const parts = [];
  while (text.length > 0) {
    if (text.length <= maxLen) { parts.push(text); break; }
    let cut = text.lastIndexOf('\n', maxLen);
    if (cut < maxLen * 0.5) cut = maxLen;
    parts.push(text.substring(0, cut));
    text = text.substring(cut).trimStart();
  }
  return parts;
}

// ══════════════════════════════════════════════════════════
//  PUBLIC COMMANDS
// ══════════════════════════════════════════════════════════

bot.onText(/\/start/, (msg) => {
  const name = msg.from.first_name || 'User';
  bot.sendMessage(msg.chat.id,
    `*Welcome to Thanafus Dars Fest\\!*\n\nHai ${escapeMd(name)}\\!\n\n` +
    `/categories \\- Official Results Portal\n` +
    `/teams \\- View teams & members\n` +
    `/programmes \\- All programmes\n` +
    `/results \\- Published results\n` +
    `/notify \\- Notifications\n` +
    `/contact \\- Contact info\n` +
    `/help \\- Show commands\n\n` +
    `Admin: /login <password>`,
    { parse_mode: 'MarkdownV2' }
  );
});

bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id,
    `*Commands:*\n` +
    `/categories \\- Results by category \\(Junior/Senior\\)\n` +
    `/cat <name> \\- Category programmes\n` +
    `/teams \\- Team list with members\n` +
    `/team <name> \\- Single team details\n` +
    `/programmes \\- All programmes\n` +
    `/search <name> \\- Search programmes\n` +
    `/results \\- Published results\n` +
    `/notify \\- Notifications\n` +
    `/contact \\- Contact info\n` +
    `/cancel \\- Cancel any action`,
    { parse_mode: 'MarkdownV2' }
  );
});

// ── /login ──────────────────────────────────────────────
bot.onText(/\/login(?:\s+(.+))?/, (msg, match) => {
  const chatId = msg.chat.id;
  const password = (match[1] || '').trim();
  if (!password) return bot.sendMessage(chatId, 'Usage: /login <password>');
  if (password === ADMIN_PASSWORD) {
    adminSessions.set(chatId, true);
    bot.sendMessage(chatId,
      '*✅ Admin Logged In\\!*\n\n' +
      '*Teams:*\n' +
      `/teams \\| /addteam \\| /delteam\n\n` +
      '*Students:*\n' +
      `/students \\| /addstudent \\| /delstudent\n\n` +
      '*Programmes:*\n' +
      `/programmes \\| /search <name>\n` +
      `/addprogramme \\| /delprogramme\n\n` +
      '*Results:*\n' +
      `/setresult \\| /results\n\n` +
      '*Penalties:*\n' +
      `/penalties \\| /addpenalty \\| /delpenalty\n\n` +
      '*Others:*\n' +
      `/addnotify \\| /delnotify \\| /stats\n` +
      `/logout`,
      { parse_mode: 'MarkdownV2' }
    );
  } else {
    bot.sendMessage(chatId, '❌ Wrong password');
  }
});

bot.onText(/\/logout/, (msg) => {
  adminSessions.delete(msg.chat.id);
  pendingActions.delete(msg.chat.id);
  bot.sendMessage(msg.chat.id, '✅ Logged out');
});

// ══════════════════════════════════════════════════════════
//  TEAMS
// ══════════════════════════════════════════════════════════

bot.onText(/\/teams/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    if (mongoose.connection.readyState !== 1) await connectDB();
    const teams = await Team.find(siteFilter('default')).sort({ rank: 1 });
    if (!teams.length) return bot.sendMessage(chatId, 'No teams found.');

    for (const t of teams) {
      const memberCount = (t.members || []).length;
      let text = `*🏆 ${escapeMd(t.name)}*\n`;
      text += `👑 Captain: ${escapeMd(t.captain)}\n`;
      text += `⭐ Vice: ${escapeMd(t.viceCaptain)}\n`;
      text += `📊 Score: *${t.totalScore}* \\| Rank: *${t.rank}*\n`;
      text += `👥 Members: *${memberCount}*\n`;

      if (memberCount > 0) {
        text += `\n*Members:*\n`;
        t.members.forEach((m, i) => { text += `  ${i + 1}\\. ${escapeMd(m)}\n`; });
      }
      text += `\n🏅 Grades \\| A:${t.grades?.A || 0} B:${t.grades?.B || 0} C:${t.grades?.C || 0}`;

      const photo = t.photo || null;
      if (photo) {
        await bot.sendPhoto(chatId, photo, { caption: text, parse_mode: 'MarkdownV2' });
      } else {
        await bot.sendMessage(chatId, text, { parse_mode: 'MarkdownV2' });
      }
    }
  } catch (e) {
    bot.sendMessage(chatId, 'Error fetching teams');
  }
});

bot.onText(/\/team(?:\s+(.+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const name = (match[1] || '').trim();
  if (!name) return bot.sendMessage(chatId, 'Usage: /team <name>\nExample: /team Sabha');
  try {
    if (mongoose.connection.readyState !== 1) await connectDB();
    const team = await Team.findOne({ ...siteFilter('default'), name: new RegExp(name, 'i') });
    if (!team) return bot.sendMessage(chatId, `Team "${escapeMd(name)}" not found.`);
    const students = await Student.find({ ...siteFilter('default'), teamId: team.id });

    let text = `*🏆 ${escapeMd(team.name)}*\n`;
    text += `👑 Captain: ${escapeMd(team.captain)}\n`;
    text += `⭐ Vice: ${escapeMd(team.viceCaptain)}\n`;
    text += `📊 Score: *${team.totalScore}* \\| Rank: *${team.rank}*\n`;
    text += `👥 Members: *${(team.members || []).length}*\n`;
    text += `🏅 A:${team.grades?.A || 0} B:${team.grades?.B || 0} C:${team.grades?.C || 0}\n`;

    if (students.length) {
      text += `\n*Registered Students (${students.length}):*\n`;
      students.forEach((s, i) => {
        text += `  ${i + 1}\\. ${escapeMd(s.name)} \\| Chest: ${escapeMd(s.chestNo || '—')}\n`;
      });
    }

    if (team.photo) {
      await bot.sendPhoto(chatId, team.photo, { caption: text, parse_mode: 'MarkdownV2' });
    } else {
      await bot.sendMessage(chatId, text, { parse_mode: 'MarkdownV2' });
    }
  } catch (e) {
    bot.sendMessage(chatId, 'Error');
  }
});

// ── /addteam ────────────────────────────────────────────
bot.onText(/\/addteam/, (msg) => {
  if (!isAdmin(msg.chat.id)) return bot.sendMessage(msg.chat.id, '🔒 Admin only');
  pendingActions.set(msg.chat.id, { step: 'addteam_name', data: {} });
  bot.sendMessage(msg.chat.id, 'Enter team name:');
});

// ── /delteam ────────────────────────────────────────────
bot.onText(/\/delteam/, async (msg) => {
  if (!isAdmin(msg.chat.id)) return bot.sendMessage(msg.chat.id, '🔒 Admin only');
  const chatId = msg.chat.id;
  try {
    const teams = await Team.find(siteFilter('default'));
    if (!teams.length) return bot.sendMessage(chatId, 'No teams.');
    let text = '*Select team to delete:*\n\n';
    teams.forEach((t, i) => { text += `${i + 1}\\. ${escapeMd(t.name)} \\(${escapeMd(t.id)}\\)\n`; });
    text += '\nSend number:';
    pendingActions.set(chatId, { step: 'delteam_select', teams });
    bot.sendMessage(chatId, text, { parse_mode: 'MarkdownV2' });
  } catch (e) { bot.sendMessage(chatId, 'Error'); }
});

// ══════════════════════════════════════════════════════════
//  PROGRAMMES
// ══════════════════════════════════════════════════════════

bot.onText(/\/programmes/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    if (mongoose.connection.readyState !== 1) await connectDB();
    const programmes = await Programme.find(siteFilter('default'));
    if (!programmes.length) return bot.sendMessage(chatId, 'No programmes found.');
    const published = programmes.filter(p => p.resultsPublished).length;
    const pending = programmes.length - published;
    let text = `*📋 Programmes*\n`;
    text += `📊 Total: *${programmes.length}* \\| ✅ Published: *${published}* \\| ⏳ Pending: *${pending}*\n\n`;
    const grouped = {};
    programmes.forEach(p => {
      const cat = p.category || 'Uncategorized';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(p);
    });
    for (const [cat, items] of Object.entries(grouped)) {
      const pub = items.filter(p => p.resultsPublished).length;
      text += `*${escapeMd(cat)}* \\(${pub}/${items.length} published\\)\n`;
      items.forEach(p => {
        const s = p.resultsPublished ? '✅' : '⏳';
        text += `  ${s} ${escapeMd(p.name)} \\| ${escapeMd(p.venue || '')} \\| ${escapeMd(p.type || '')}\n`;
      });
      text += '\n';
    }
    for (const part of splitMsg(text)) {
      await bot.sendMessage(chatId, part, { parse_mode: 'MarkdownV2' });
    }
  } catch (e) { bot.sendMessage(chatId, 'Error fetching programmes'); }
});

bot.onText(/\/search(?:\s+(.+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const query = (match[1] || '').trim();
  if (!query) return bot.sendMessage(chatId, 'Usage: /search <programme name>\nExample: /search Qiraath');
  try {
    if (mongoose.connection.readyState !== 1) await connectDB();
    const regex = new RegExp(query, 'i');
    const progs = await Programme.find({ ...siteFilter('default'), name: regex });
    if (!progs.length) return bot.sendMessage(chatId, `No programmes matching "${escapeMd(query)}"`);
    let text = `*🔍 Search: ${escapeMd(query)}* \\(${progs.length} found\\)\n\n`;
    progs.forEach(p => {
      const s = p.resultsPublished ? '✅' : '⏳';
      text += `${s} *${escapeMd(p.name)}*\n`;
      text += `  Category: ${escapeMd(p.category || '—')} \\| Venue: ${escapeMd(p.venue || '—')} \\| Type: ${escapeMd(p.type || '—')}\n`;
      if (p.resultsPublished && p.results && p.results.length) {
        text += `  Results:\n`;
        p.results.sort((a, b) => (a.rank || 99) - (b.rank || 99)).forEach(r => {
          const name = r.studentId || r.teamId || '—';
          const icon = r.type === 'team' ? '👥' : '🧑';
          text += `    ${r.rank}\\. ${icon} ${escapeMd(name)} \\(${escapeMd(r.grade || '')}\\)`;
          if (r.marks != null) text += ` \\| ${r.marks}`;
          text += '\n';
        });
      }
      text += '\n';
    });
    for (const part of splitMsg(text)) {
      await bot.sendMessage(chatId, part, { parse_mode: 'MarkdownV2' });
    }
  } catch (e) { bot.sendMessage(chatId, 'Error searching'); }
});

bot.onText(/\/addprogramme/, (msg) => {
  if (!isAdmin(msg.chat.id)) return bot.sendMessage(msg.chat.id, '🔒 Admin only');
  pendingActions.set(msg.chat.id, { step: 'addprog_name', data: {} });
  bot.sendMessage(msg.chat.id, 'Enter programme name:');
});

bot.onText(/\/delprogramme/, async (msg) => {
  if (!isAdmin(msg.chat.id)) return bot.sendMessage(msg.chat.id, '🔒 Admin only');
  const chatId = msg.chat.id;
  try {
    const progs = await Programme.find(siteFilter('default'));
    if (!progs.length) return bot.sendMessage(chatId, 'No programmes.');
    let text = '*Select programme to delete:*\n\n';
    progs.slice(0, 30).forEach((p, i) => { text += `${i + 1}\\. ${escapeMd(p.name)}\n`; });
    text += '\nSend number:';
    pendingActions.set(chatId, { step: 'delprog_select', progs: progs.slice(0, 30) });
    bot.sendMessage(chatId, text, { parse_mode: 'MarkdownV2' });
  } catch (e) { bot.sendMessage(chatId, 'Error'); }
});

// ══════════════════════════════════════════════════════════
//  RESULTS
// ══════════════════════════════════════════════════════════

bot.onText(/\/setresult/, async (msg) => {
  if (!isAdmin(msg.chat.id)) return bot.sendMessage(msg.chat.id, '🔒 Admin only');
  const chatId = msg.chat.id;
  try {
    const progs = await Programme.find(siteFilter('default'));
    if (!progs.length) return bot.sendMessage(chatId, 'No programmes found.');
    let text = '*🏆 Select Programme*\n\n';
    progs.slice(0, 30).forEach((p, i) => {
      const s = p.resultsPublished ? '✅' : '⏳';
      text += `${s} ${i + 1}\\. ${escapeMd(p.name)} \\| ${escapeMd(p.category || '')}\n`;
    });
    text += '\nSend number:';
    pendingActions.set(chatId, { step: 'setresult_select', progs: progs.slice(0, 30), results: [] });
    bot.sendMessage(chatId, text, { parse_mode: 'MarkdownV2' });
  } catch (e) { bot.sendMessage(chatId, 'Error'); }
});

bot.onText(/\/results/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    if (mongoose.connection.readyState !== 1) await connectDB();
    const progs = await Programme.find(siteFilter('default'));
    const published = progs.filter(p => p.resultsPublished);
    if (!published.length) return bot.sendMessage(chatId, 'No published results yet.');
    let text = '*🏆 Published Results*\n\n';
    for (const p of published) {
      text += `*${escapeMd(p.name)}* \\| ${escapeMd(p.category || '')}\n`;
      if (p.results && p.results.length) {
        const sorted = [...p.results].sort((a, b) => (a.rank || 99) - (b.rank || 99));
        for (const r of sorted) {
          const name = r.studentId || r.teamId || '—';
          const icon = r.type === 'team' ? '👥' : '🧑';
          const marks = r.marks != null ? ` \\| ${r.marks} marks` : '';
          text += `  ${r.rank}\\. ${icon} ${escapeMd(name)} \\(${escapeMd(r.grade || '')}\\)${marks}\n`;
        }
      }
      text += '\n';
    }
    for (const part of splitMsg(text)) {
      await bot.sendMessage(chatId, part, { parse_mode: 'MarkdownV2' });
    }
  } catch (e) { bot.sendMessage(chatId, 'Error fetching results'); }
});

// ══════════════════════════════════════════════════════════
//  OFFICIAL RESULTS PORTAL (Categories)
// ══════════════════════════════════════════════════════════

const CATEGORIES = ['Junior', 'Sub Junior', 'Senior', 'Super Senior'];

bot.onText(/\/categories/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    if (mongoose.connection.readyState !== 1) await connectDB();
    const allProgs = await Programme.find(siteFilter('default'));
    let text = '*🏆 Official Results Portal*\n\nSelect a category:\n\n';
    CATEGORIES.forEach((cat, i) => {
      const catProgs = allProgs.filter(p => (p.category || '').toLowerCase() === cat.toLowerCase());
      const published = catProgs.filter(p => p.resultsPublished).length;
      const pending = catProgs.length - published;
      text += `${i + 1}\\. *${escapeMd(cat)}* \\| ${catProgs.length} programmes \\| ✅ ${published} published \\| ⏳ ${pending} pending\n`;
    });
    text += `\n Send number to view:`;
    pendingActions.set(chatId, { step: 'category_select', allProgs });
    bot.sendMessage(chatId, text, { parse_mode: 'MarkdownV2' });
  } catch (e) { bot.sendMessage(chatId, 'Error'); }
});

bot.onText(/\/cat(?:\s+(.+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const catName = (match[1] || '').trim();
  if (!catName) {
    return bot.sendMessage(chatId, 'Usage: /cat <category>\nExample: /cat Junior');
  }
  try {
    if (mongoose.connection.readyState !== 1) await connectDB();
    const progs = await Programme.find({ ...siteFilter('default'), category: new RegExp(catName, 'i') });
    if (!progs.length) return bot.sendMessage(chatId, `No programmes found for "${escapeMd(catName)}"`);
    const published = progs.filter(p => p.resultsPublished);
    const pending = progs.filter(p => !p.resultsPublished);
    let text = `*🏆 ${escapeMd(catName)}*\n`;
    text += `📊 Total: *${progs.length}* \\| ✅ Published: *${published.length}* \\| ⏳ Pending: *${pending.length}*\n\n`;
    if (published.length) {
      text += `*✅ Published Results:*\n`;
      published.forEach(p => {
        text += `\n*${escapeMd(p.name)}* \\| ${escapeMd(p.venue || '')}\n`;
        if (p.results && p.results.length) {
          p.results.sort((a, b) => (a.rank || 99) - (b.rank || 99)).forEach(r => {
            const name = r.studentId || r.teamId || '—';
            const icon = r.type === 'team' ? '👥' : '🧑';
            const marks = r.marks != null ? ` \\| ${r.marks}` : '';
            text += `  ${r.rank}\\. ${icon} ${escapeMd(name)} \\(${escapeMd(r.grade || '')}\\)${marks}\n`;
          });
        }
      });
    }
    if (pending.length) {
      text += `\n*⏳ Pending:*\n`;
      pending.forEach(p => {
        text += `  ${escapeMd(p.name)} \\| ${escapeMd(p.venue || '')}\n`;
      });
    }
    for (const part of splitMsg(text)) {
      await bot.sendMessage(chatId, part, { parse_mode: 'MarkdownV2' });
    }
  } catch (e) { bot.sendMessage(chatId, 'Error'); }
});

// ══════════════════════════════════════════════════════════
//  NOTIFICATIONS
// ══════════════════════════════════════════════════════════

bot.onText(/\/notify/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    if (mongoose.connection.readyState !== 1) await connectDB();
    const notes = await Notification.find(siteFilter('default')).sort({ date: -1 });
    if (!notes.length) return bot.sendMessage(chatId, 'No notifications.');
    let text = '*📢 Notifications*\n\n';
    notes.slice(0, 10).forEach(n => {
      text += `*${escapeMd(n.title)}*\n${escapeMd(n.content)}\n📅 ${escapeMd(n.date || '')}\n\n`;
    });
    for (const part of splitMsg(text)) {
      await bot.sendMessage(chatId, part, { parse_mode: 'MarkdownV2' });
    }
  } catch (e) { bot.sendMessage(chatId, 'Error'); }
});

bot.onText(/\/addnotify/, (msg) => {
  if (!isAdmin(msg.chat.id)) return bot.sendMessage(msg.chat.id, '🔒 Admin only');
  pendingActions.set(msg.chat.id, { step: 'addnotify_title' });
  bot.sendMessage(msg.chat.id, 'Enter notification title:');
});

bot.onText(/\/delnotify/, async (msg) => {
  if (!isAdmin(msg.chat.id)) return bot.sendMessage(msg.chat.id, '🔒 Admin only');
  const chatId = msg.chat.id;
  try {
    const notes = await Notification.find(siteFilter('default'));
    if (!notes.length) return bot.sendMessage(chatId, 'No notifications.');
    let text = '*Select notification to delete:*\n\n';
    notes.slice(0, 20).forEach((n, i) => { text += `${i + 1}\\. ${escapeMd(n.title)}\n`; });
    text += '\nSend number:';
    pendingActions.set(chatId, { step: 'delnotify_select', notes: notes.slice(0, 20) });
    bot.sendMessage(chatId, text, { parse_mode: 'MarkdownV2' });
  } catch (e) { bot.sendMessage(chatId, 'Error'); }
});

// ══════════════════════════════════════════════════════════
//  STUDENTS
// ══════════════════════════════════════════════════════════

bot.onText(/\/students/, async (msg) => {
  if (!isAdmin(msg.chat.id)) return bot.sendMessage(msg.chat.id, '🔒 Admin only');
  const chatId = msg.chat.id;
  try {
    const students = await Student.find(siteFilter('default'));
    const teams = await Team.find(siteFilter('default'));
    if (!students.length) return bot.sendMessage(chatId, 'No students.');
    let text = `*📚 Students*\n`;
    text += `📊 Total: *${students.length}*\n\n`;
    const teamMap = {};
    teams.forEach(t => { teamMap[t.id] = t.name; });
    const byTeam = {};
    students.forEach(s => {
      const tName = teamMap[s.teamId] || s.teamId || 'No Team';
      if (!byTeam[tName]) byTeam[tName] = [];
      byTeam[tName].push(s);
    });
    for (const [tName, studs] of Object.entries(byTeam)) {
      text += `👥 *${escapeMd(tName)}* \\(${studs.length} students\\)\n`;
      studs.forEach((s, i) => {
        text += `  ${i + 1}\\. ${escapeMd(s.name)} \\| Chest: ${escapeMd(s.chestNo || '—')} \\| ${escapeMd(s.category || '')}\n`;
      });
      text += '\n';
    }
    for (const part of splitMsg(text)) {
      await bot.sendMessage(chatId, part, { parse_mode: 'MarkdownV2' });
    }
  } catch (e) { bot.sendMessage(chatId, 'Error'); }
});

bot.onText(/\/addstudent/, (msg) => {
  if (!isAdmin(msg.chat.id)) return bot.sendMessage(msg.chat.id, '🔒 Admin only');
  pendingActions.set(msg.chat.id, { step: 'addstudent_name', data: {} });
  bot.sendMessage(msg.chat.id, 'Enter student name:');
});

bot.onText(/\/delstudent/, async (msg) => {
  if (!isAdmin(msg.chat.id)) return bot.sendMessage(msg.chat.id, '🔒 Admin only');
  const chatId = msg.chat.id;
  try {
    const studs = await Student.find(siteFilter('default'));
    if (!studs.length) return bot.sendMessage(chatId, 'No students.');
    let text = '*Select student to delete:*\n\n';
    studs.slice(0, 30).forEach((s, i) => { text += `${i + 1}\\. ${escapeMd(s.name)}\n`; });
    text += '\nSend number:';
    pendingActions.set(chatId, { step: 'delstudent_select', studs: studs.slice(0, 30) });
    bot.sendMessage(chatId, text, { parse_mode: 'MarkdownV2' });
  } catch (e) { bot.sendMessage(chatId, 'Error'); }
});

// ══════════════════════════════════════════════════════════
//  PENALTIES
// ══════════════════════════════════════════════════════════

bot.onText(/\/penalties/, async (msg) => {
  if (!isAdmin(msg.chat.id)) return bot.sendMessage(msg.chat.id, '🔒 Admin only');
  const chatId = msg.chat.id;
  try {
    const penalties = await Penalty.find(siteFilter('default'));
    if (!penalties.length) return bot.sendMessage(chatId, 'No penalties.');
    const teamMap = {};
    (await Team.find(siteFilter('default'))).forEach(t => { teamMap[t.id] = t.name; });
    let text = '*⚠️ Penalties*\n\n';
    penalties.forEach(p => {
      const tName = teamMap[p.teamId] || p.teamId;
      text += `👥 ${escapeMd(tName)} \\| 📉 *\\-${p.points}* pts\n`;
      text += `📝 ${escapeMd(p.reason || '')}\n\n`;
    });
    bot.sendMessage(chatId, text, { parse_mode: 'MarkdownV2' });
  } catch (e) { bot.sendMessage(chatId, 'Error'); }
});

bot.onText(/\/addpenalty/, async (msg) => {
  if (!isAdmin(msg.chat.id)) return bot.sendMessage(msg.chat.id, '🔒 Admin only');
  const chatId = msg.chat.id;
  try {
    const teams = await Team.find(siteFilter('default')).sort({ rank: 1 });
    if (!teams.length) return bot.sendMessage(chatId, 'No teams found.');
    let text = '*⚠️ Add Penalty \\- Select Team*\n\n';
    teams.forEach((t, i) => {
      text += `${i + 1}\\. ${escapeMd(t.name)} \\(Score: ${t.totalScore}\\)\n`;
    });
    text += '\nSend number:';
    pendingActions.set(chatId, { step: 'penalty_team_select', teams, data: {} });
    bot.sendMessage(chatId, text, { parse_mode: 'MarkdownV2' });
  } catch (e) { bot.sendMessage(chatId, 'Error'); }
});

bot.onText(/\/delpenalty/, async (msg) => {
  if (!isAdmin(msg.chat.id)) return bot.sendMessage(msg.chat.id, '🔒 Admin only');
  const chatId = msg.chat.id;
  try {
    const penalties = await Penalty.find(siteFilter('default'));
    if (!penalties.length) return bot.sendMessage(chatId, 'No penalties.');
    const teamMap = {};
    (await Team.find(siteFilter('default'))).forEach(t => { teamMap[t.id] = t.name; });
    let text = '*Select penalty to delete:*\n\n';
    penalties.slice(0, 20).forEach((p, i) => {
      const tName = teamMap[p.teamId] || p.teamId;
      text += `${i + 1}\\. ${escapeMd(tName)} \\| \\-${p.points}pts \\| ${escapeMd(p.reason || '')}\n`;
    });
    text += '\nSend number:';
    pendingActions.set(chatId, { step: 'delpenalty_select', penalties: penalties.slice(0, 20) });
    bot.sendMessage(chatId, text, { parse_mode: 'MarkdownV2' });
  } catch (e) { bot.sendMessage(chatId, 'Error'); }
});

// ── /stats ──────────────────────────────────────────────
bot.onText(/\/stats/, async (msg) => {
  if (!isAdmin(msg.chat.id)) return bot.sendMessage(msg.chat.id, '🔒 Admin only');
  const chatId = msg.chat.id;
  try {
    if (mongoose.connection.readyState !== 1) await connectDB();
    const [teams, students, programmes, notifications, appeals, gallery, messages, penalties] = await Promise.all([
      Team.countDocuments(siteFilter('default')),
      Student.countDocuments(siteFilter('default')),
      Programme.countDocuments(siteFilter('default')),
      Notification.countDocuments(siteFilter('default')),
      Appeal.countDocuments(siteFilter('default')),
      Gallery.countDocuments(siteFilter('default')),
      Message.countDocuments(siteFilter('default')),
      Penalty.countDocuments(siteFilter('default'))
    ]);
    bot.sendMessage(chatId,
      `📊 *Database Stats*\n\n` +
      `Teams: ${teams}\nStudents: ${students}\nProgrammes: ${programmes}\n` +
      `Notifications: ${notifications}\nAppeals: ${appeals}\nGallery: ${gallery}\n` +
      `Messages: ${messages}\nPenalties: ${penalties}\n\n` +
      `DB: ${mongoose.connection.readyState === 1 ? '✅' : '❌'}`,
      { parse_mode: 'MarkdownV2' }
    );
  } catch (e) { bot.sendMessage(chatId, 'Error'); }
});

bot.onText(/\/contact/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    if (mongoose.connection.readyState !== 1) await connectDB();
    const c = await Contact.findOne(siteFilter('default'));
    if (!c) return bot.sendMessage(chatId, 'No contact info.');
    bot.sendMessage(chatId,
      `📞 *Contact*\n\nCoordinator: ${c.coordinatorName || ''}\n` +
      `Phone: ${c.coordinatorPhone || ''}\nTech: ${c.techSupportName || ''}\n` +
      `Support: ${c.techSupportPhone || ''}\nEmail: ${c.email || ''}\n${c.address || ''}`,
      { parse_mode: 'MarkdownV2' }
    );
  } catch (e) { bot.sendMessage(chatId, 'Error'); }
});

// ══════════════════════════════════════════════════════════
//  CONVERSATION HANDLER
// ══════════════════════════════════════════════════════════

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const action = pendingActions.get(chatId);
  if (!action) return;
  const text = (msg.text || '').trim();
  const photo = (msg.photo && msg.photo.length) ? msg.photo[msg.photo.length - 1].file_id : null;

  if (text === '/cancel') {
    pendingActions.delete(chatId);
    return bot.sendMessage(chatId, '❌ Cancelled');
  }

  try {
    if (mongoose.connection.readyState !== 1) await connectDB();

    // ── Add Team ──
    if (action.step === 'addteam_name') {
      action.data.name = text;
      action.step = 'addteam_photo';
      return bot.sendMessage(chatId, 'Send team photo or /skip:');
    }
    if (action.step === 'addteam_photo') {
      if (photo) action.data.photo = photo;
      action.step = 'addteam_captain';
      return bot.sendMessage(chatId, 'Enter captain name:');
    }
    if (action.step === 'addteam_captain') {
      action.data.captain = text;
      action.step = 'addteam_vice';
      return bot.sendMessage(chatId, 'Enter vice captain name:');
    }
    if (action.step === 'addteam_vice') {
      action.data.viceCaptain = text;
      action.step = 'addteam_members';
      return bot.sendMessage(chatId, 'Enter members (comma separated):');
    }
    if (action.step === 'addteam_members') {
      const members = text.split(',').map(m => m.trim()).filter(Boolean);
      const team = {
        id: 'team-' + Date.now(),
        name: action.data.name,
        captain: action.data.captain,
        viceCaptain: action.data.viceCaptain,
        photo: action.data.photo || '',
        members,
        totalScore: 0,
        rank: (await Team.countDocuments(siteFilter('default'))) + 1,
        grades: { A: 0, B: 0, C: 0 },
        wins: [],
        siteKey: 'default'
      };
      await Team.create(team);
      pendingActions.delete(chatId);
      return bot.sendMessage(chatId, `✅ Team *${escapeMd(team.name)}* added\\! \\(${memberCount} members\\)`, { parse_mode: 'MarkdownV2' });
    }

    // ── Delete Team ──
    if (action.step === 'delteam_select') {
      const idx = parseInt(text) - 1;
      if (idx < 0 || idx >= action.teams.length) return bot.sendMessage(chatId, 'Invalid number');
      const team = action.teams[idx];
      await Team.deleteOne({ _id: team._id });
      pendingActions.delete(chatId);
      return bot.sendMessage(chatId, `✅ Team *${escapeMd(team.name)}* deleted`, { parse_mode: 'MarkdownV2' });
    }

    // ── Add Programme ──
    if (action.step === 'addprog_name') {
      action.data.name = text;
      action.step = 'addprog_category';
      return bot.sendMessage(chatId, 'Enter category (Arts/Sports/Quiz):');
    }
    if (action.step === 'addprog_category') {
      action.data.category = text;
      action.step = 'addprog_venue';
      return bot.sendMessage(chatId, 'Enter venue:');
    }
    if (action.step === 'addprog_venue') {
      action.data.venue = text;
      action.step = 'addprog_type';
      return bot.sendMessage(chatId, 'Type (individual/team/both):');
    }
    if (action.step === 'addprog_type') {
      action.data.type = text;
      const prog = {
        id: 'prog-' + Date.now(),
        name: action.data.name,
        category: action.data.category,
        venue: action.data.venue,
        type: action.data.type,
        resultsPublished: false,
        results: [],
        siteKey: 'default'
      };
      await Programme.create(prog);
      pendingActions.delete(chatId);
      return bot.sendMessage(chatId, `✅ Programme *${escapeMd(prog.name)}* added\\!`, { parse_mode: 'MarkdownV2' });
    }

    // ── Delete Programme ──
    if (action.step === 'delprog_select') {
      const idx = parseInt(text) - 1;
      if (idx < 0 || idx >= action.progs.length) return bot.sendMessage(chatId, 'Invalid number');
      const prog = action.progs[idx];
      await Programme.deleteOne({ _id: prog._id });
      pendingActions.delete(chatId);
      return bot.sendMessage(chatId, `✅ Deleted *${escapeMd(prog.name)}*`, { parse_mode: 'MarkdownV2' });
    }

    // ── Category Select (Official Results Portal) ──
    if (action.step === 'category_select') {
      const idx = parseInt(text) - 1;
      if (idx < 0 || idx >= CATEGORIES.length) return bot.sendMessage(chatId, 'Invalid number');
      const catName = CATEGORIES[idx];
      const catProgs = (action.allProgs || []).filter(p => (p.category || '').toLowerCase() === catName.toLowerCase());
      if (!catProgs.length) {
        pendingActions.delete(chatId);
        return bot.sendMessage(chatId, `No programmes found for *${escapeMd(catName)}*`, { parse_mode: 'MarkdownV2' });
      }
      const published = catProgs.filter(p => p.resultsPublished);
      const pending = catProgs.filter(p => !p.resultsPublished);
      let text2 = `*🏆 ${escapeMd(catName)}*\n`;
      text2 += `📊 Total: *${catProgs.length}* \\| ✅ Published: *${published.length}* \\| ⏳ Pending: *${pending.length}*\n\n`;
      if (published.length) {
        text2 += `*✅ Published Results:*\n`;
        published.forEach(p => {
          text2 += `\n*${escapeMd(p.name)}* \\| ${escapeMd(p.venue || '')}\n`;
          if (p.results && p.results.length) {
            p.results.sort((a, b) => (a.rank || 99) - (b.rank || 99)).forEach(r => {
              const name = r.studentId || r.teamId || '—';
              const icon = r.type === 'team' ? '👥' : '🧑';
              const marks = r.marks != null ? ` \\| ${r.marks}` : '';
              text2 += `  ${r.rank}\\. ${icon} ${escapeMd(name)} \\(${escapeMd(r.grade || '')}\\)${marks}\n`;
            });
          }
        });
      }
      if (pending.length) {
        text2 += `\n*⏳ Pending:*\n`;
        pending.forEach(p => {
          text2 += `  ${escapeMd(p.name)} \\| ${escapeMd(p.venue || '')}\n`;
        });
      }
      pendingActions.delete(chatId);
      for (const part of splitMsg(text2)) {
        await bot.sendMessage(chatId, part, { parse_mode: 'MarkdownV2' });
      }
      return;
    }

    // ── Set Result Flow (Screenshot-style) ──
    if (action.step === 'setresult_select') {
      const idx = parseInt(text) - 1;
      if (idx < 0 || idx >= action.progs.length) return bot.sendMessage(chatId, 'Invalid number');
      const prog = action.progs[idx];
      action.progId = prog._id;
      action.progName = prog.name;
      action.progCategory = prog.category || '';
      action.progType = (prog.type || '').toLowerCase();
      action.rankCounter = 1;
      action.results = [];
      action.resultType = (action.progType.includes('group') || action.progType.includes('team')) ? 'team' : 'individual';

      const typeTag = action.resultType === 'team' ? '👥 GROUP' : '🧑 GENERAL';
      const gradePoints = '1st=10, 2nd=8, 3rd=6 | Grade A=5, B=3, C=1';

      let msg = `*📝 Publish Results & Marks Entry*\n\n`;
      msg += `🏷️ Category: *${escapeMd(action.progCategory)}*\n`;
      msg += `📌 *${escapeMd(action.progName)}*\n`;
      msg += `${typeTag}\n`;
      msg += `📊 Scoring: ${escapeMd(gradePoints)}\n\n`;
      msg += `*🏆 Rank Winners (1st, 2nd, 3rd\\.\\.\\)*\n\n`;

      if (action.resultType === 'team') {
        const teams = await Team.find(siteFilter('default')).sort({ rank: 1 });
        if (!teams.length) { pendingActions.delete(chatId); return bot.sendMessage(chatId, 'No teams found.'); }
        action.items = teams;
        msg += `Select team for *Rank ${action.rankCounter}*:\n\n`;
        teams.forEach((t, i) => {
          const memberCount = (t.members || []).length;
          msg += `${i + 1}\\. ${escapeMd(t.name)} \\| 👥 ${memberCount} members \\| Score: ${t.totalScore}\n`;
        });
      } else {
        const filter = siteFilter('default');
        if (action.progCategory) {
          filter.category = action.progCategory;
        }
        const students = await Student.find(filter);
        if (!students.length) {
          const allStudents = await Student.find(siteFilter('default'));
          action.items = allStudents;
          msg += `No *${escapeMd(action.progCategory)}* students\\. Showing all:\n\n`;
          allStudents.slice(0, 30).forEach((s, i) => {
            msg += `${i + 1}\\. ${escapeMd(s.name)} \\| Chest: ${escapeMd(s.chestNo || '—')} \\| Team: ${escapeMd(s.teamId || '—')}\n`;
          });
        } else {
          action.items = students;
          msg += `Select student for *Rank ${action.rankCounter}*:\n\n`;
          students.slice(0, 30).forEach((s, i) => {
            msg += `${i + 1}\\. ${escapeMd(s.name)} \\| Chest: ${escapeMd(s.chestNo || '—')} \\| Team: ${escapeMd(s.teamId || '—')}\n`;
          });
        }
        msg += `\nYou can also *type name or chest no* to search:`;
      }
      action.step = 'setresult_pick';
      return bot.sendMessage(chatId, msg, { parse_mode: 'MarkdownV2' });
    }

    // ── Pick student/team (by number OR by name/chest search) ──
    if (action.step === 'setresult_pick') {
      let selected = null;
      const numIdx = parseInt(text) - 1;
      if (!isNaN(numIdx) && numIdx >= 0 && numIdx < (action.items || []).length) {
        selected = action.items[numIdx];
      } else if (action.items && action.items.length) {
        const q = text.toLowerCase();
        selected = action.items.find(s =>
          (s.name && s.name.toLowerCase().includes(q)) ||
          (s.chestNo && String(s.chestNo).toLowerCase().includes(q))
        );
      }
      if (!selected) return bot.sendMessage(chatId, 'Invalid selection. Send number or type name/chest no:');

      action.selectedItem = selected;
      const gradePoints = { A: 5, B: 3, C: 1, D: 0 };

      let msg = `*Rank ${action.rankCounter}: ${escapeMd(selected.name)}*\n`;
      if (action.resultType === 'team') {
        const memberCount = (selected.members || []).length;
        msg += `👥 Members: *${memberCount}*\n`;
        if (selected.members && selected.members.length) {
          selected.members.forEach((m, i) => { msg += `  ${i + 1}\\. ${escapeMd(m)}\n`; });
        }
      } else {
        msg += `🪪 Chest: ${escapeMd(selected.chestNo || '—')}\n`;
      }
      msg += `\nSelect grade:\n`;
      msg += `1\\. 🅰️ A \\(Excellent\\) \\| 5 pts\n`;
      msg += `2\\. 🅱️ B \\(Good\\) \\| 3 pts\n`;
      msg += `3\\. ©️ C \\(Average\\) \\| 1 pt\n`;
      msg += `4\\. 🅳 D \\(Below Avg\\) \\| 0 pts\n`;
      msg += `5\\. ✏️ Custom\n\nSend 1\\-5:`;
      action.step = 'setresult_grade';
      return bot.sendMessage(chatId, msg, { parse_mode: 'MarkdownV2' });
    }

    if (action.step === 'setresult_grade') {
      const gradeMap = { '1': 'A', '2': 'B', '3': 'C', '4': 'D' };
      if (gradeMap[text]) {
        action.selectedGrade = gradeMap[text];
        action.selectedPoints = { A: 5, B: 3, C: 1, D: 0 }[action.selectedGrade];
      } else if (text === '5') {
        action.step = 'setresult_grade_custom';
        return bot.sendMessage(chatId, 'Enter custom grade name:');
      } else {
        return bot.sendMessage(chatId, 'Send 1\\-5:', { parse_mode: 'MarkdownV2' });
      }
      action.step = 'setresult_marks';
      return bot.sendMessage(chatId, `Grade: *${action.selectedGrade}* \\| Points: *${action.selectedPoints}*\n\nEnter marks/score \\(/skip to skip\\):`, { parse_mode: 'MarkdownV2' });
    }

    if (action.step === 'setresult_grade_custom') {
      action.selectedGrade = text;
      action.selectedPoints = 0;
      action.step = 'setresult_marks';
      return bot.sendMessage(chatId, `Custom Grade: *${escapeMd(text)}*\n\nEnter marks/score \\(/skip to skip\\):`, { parse_mode: 'MarkdownV2' });
    }

    if (action.step === 'setresult_marks') {
      const marks = text === '/skip' ? null : parseInt(text) || null;
      const result = {
        rank: action.rankCounter,
        grade: action.selectedGrade,
        marks,
        type: action.resultType,
        points: action.selectedPoints || 0
      };
      if (action.resultType === 'individual') {
        result.studentId = action.selectedItem.id;
      } else {
        result.teamId = action.selectedItem.id;
      }
      action.results.push(result);

      let summary = `✅ *Rank ${action.rankCounter}:*\n`;
      summary += `${action.resultType === 'team' ? '👥' : '🧑'} ${escapeMd(action.selectedItem.name)}\n`;
      summary += `Grade: *${escapeMd(action.selectedGrade)}* \\| Points: *${action.selectedPoints || 0}*`;
      if (marks != null) summary += ` \\| Marks: ${marks}`;
      summary += `\n\n---\\n`;
      summary += `Add more? Send next rank \\(${action.rankCounter + 1}\\) or /done to save\\:\\n`;
      summary += `/done \\= Save & Publish`;
      action.rankCounter++;
      action.step = 'setresult_next';
      return bot.sendMessage(chatId, summary, { parse_mode: 'MarkdownV2' });
    }

    if (action.step === 'setresult_next') {
      if (text === '/done' || text === 'done') {
        await Programme.updateOne(
          { _id: action.progId },
          { $set: { results: action.results, resultsPublished: true, resultsPublishedAt: new Date().toISOString() } }
        );
        pendingActions.delete(chatId);
        let msg = `✅ *Results Published\\!*\n\n*${escapeMd(action.progName)}*\n\n`;
        action.results.forEach(r => {
          const icon = r.type === 'team' ? '👥' : '🧑';
          msg += `${icon} Rank ${r.rank}: *${escapeMd(r.studentId || r.teamId)}*\n`;
          msg += `  Grade: ${escapeMd(r.grade)} \\| Points: ${r.points || 0}`;
          if (r.marks != null) msg += ` \\| Marks: ${r.marks}`;
          msg += '\n\n';
        });
        const totalPts = action.results.reduce((sum, r) => sum + (r.points || 0), 0);
        msg += `📊 Total Points: *${totalPts}*`;
        return bot.sendMessage(chatId, msg, { parse_mode: 'MarkdownV2' });
      }
      const nextRank = parseInt(text);
      if (!isNaN(nextRank) && nextRank === action.rankCounter) {
        if (action.resultType === 'team') {
          const teams = await Team.find(siteFilter('default')).sort({ rank: 1 });
          action.items = teams;
          let list = `*Select team for Rank ${action.rankCounter}:*\n\n`;
          teams.forEach((t, i) => {
            const mc = (t.members || []).length;
            list += `${i + 1}\\. ${escapeMd(t.name)} \\| 👥 ${mc} members \\| Score: ${t.totalScore}\n`;
          });
          list += `\nType name to search:`;
          action.step = 'setresult_pick';
          return bot.sendMessage(chatId, list, { parse_mode: 'MarkdownV2' });
        } else {
          const filter = siteFilter('default');
          if (action.progCategory) filter.category = action.progCategory;
          let students = await Student.find(filter);
          if (!students.length) students = await Student.find(siteFilter('default'));
          action.items = students;
          let list = `*Select student for Rank ${action.rankCounter}:*\n\n`;
          students.slice(0, 30).forEach((s, i) => {
            list += `${i + 1}\\. ${escapeMd(s.name)} \\| Chest: ${escapeMd(s.chestNo || '—')} \\| Team: ${escapeMd(s.teamId || '—')}\n`;
          });
          list += `\nType name or chest no to search:`;
          action.step = 'setresult_pick';
          return bot.sendMessage(chatId, list, { parse_mode: 'MarkdownV2' });
        }
      }
      return bot.sendMessage(chatId, `Expected rank ${action.rankCounter} or /done`);
    }

    // ── Add Notification ──
    if (action.step === 'addnotify_title') {
      action.data.title = text;
      action.step = 'addnotify_content';
      return bot.sendMessage(chatId, 'Enter content:');
    }
    if (action.step === 'addnotify_content') {
      const note = {
        id: 'notif-' + Date.now(),
        title: action.data.title,
        content: text,
        type: 'info',
        date: new Date().toISOString(),
        siteKey: 'default'
      };
      await Notification.create(note);
      pendingActions.delete(chatId);
      return bot.sendMessage(chatId, `✅ Notification *${escapeMd(note.title)}* added\\!`, { parse_mode: 'MarkdownV2' });
    }

    // ── Delete Notification ──
    if (action.step === 'delnotify_select') {
      const idx = parseInt(text) - 1;
      if (idx < 0 || idx >= action.notes.length) return bot.sendMessage(chatId, 'Invalid number');
      await Notification.deleteOne({ _id: action.notes[idx]._id });
      pendingActions.delete(chatId);
      return bot.sendMessage(chatId, '✅ Deleted');
    }

    // ── Add Student ──
    if (action.step === 'addstudent_name') {
      action.data.name = text;
      action.step = 'addstudent_chest';
      return bot.sendMessage(chatId, 'Enter chest number:');
    }
    if (action.step === 'addstudent_chest') {
      action.data.chestNo = text;
      const teams = await Team.find(siteFilter('default'));
      if (!teams.length) {
        action.step = 'addstudent_team_manual';
        return bot.sendMessage(chatId, 'No teams in DB. Enter team ID:');
      }
      action.teams = teams;
      let list = '*Select team:*\n\n';
      teams.forEach((t, i) => { list += `${i + 1}\\. ${escapeMd(t.name)}\n`; });
      list += '\nSend number:';
      action.step = 'addstudent_team_select';
      return bot.sendMessage(chatId, list, { parse_mode: 'MarkdownV2' });
    }
    if (action.step === 'addstudent_team_select') {
      const idx = parseInt(text) - 1;
      if (idx < 0 || idx >= action.teams.length) return bot.sendMessage(chatId, 'Invalid number');
      action.data.teamId = action.teams[idx].id;
      action.data.teamName = action.teams[idx].name;
      action.step = 'addstudent_category';
      return bot.sendMessage(chatId, 'Enter category:');
    }
    if (action.step === 'addstudent_team_manual') {
      action.data.teamId = text;
      action.step = 'addstudent_category';
      return bot.sendMessage(chatId, 'Enter category:');
    }
    if (action.step === 'addstudent_category') {
      action.data.category = text;
      action.step = 'addstudent_photo';
      return bot.sendMessage(chatId, 'Send student profile photo or /skip:');
    }
    if (action.step === 'addstudent_photo') {
      if (photo) {
        action.data.photo = photo;
      }
      const student = {
        id: 'stu-' + Date.now(),
        name: action.data.name,
        chestNo: action.data.chestNo,
        teamId: action.data.teamId,
        category: action.data.category,
        photo: action.data.photo || '',
        siteKey: 'default'
      };
      await Student.create(student);
      pendingActions.delete(chatId);
      const teamLabel = action.data.teamName || action.data.teamId;
      let msg = `✅ *Student Added\\!*\n\nName: ${escapeMd(student.name)}\nChest: ${escapeMd(student.chestNo)}\nTeam: ${escapeMd(teamLabel)}\nCategory: ${escapeMd(student.category)}`;
      if (student.photo) {
        return bot.sendPhoto(chatId, student.photo, { caption: msg, parse_mode: 'MarkdownV2' });
      }
      return bot.sendMessage(chatId, msg, { parse_mode: 'MarkdownV2' });
    }

    // ── Delete Student ──
    if (action.step === 'delstudent_select') {
      const idx = parseInt(text) - 1;
      if (idx < 0 || idx >= action.studs.length) return bot.sendMessage(chatId, 'Invalid number');
      const s = action.studs[idx];
      await Student.deleteOne({ _id: s._id });
      pendingActions.delete(chatId);
      return bot.sendMessage(chatId, `✅ Deleted *${escapeMd(s.name)}*`, { parse_mode: 'MarkdownV2' });
    }

    // ── Penalty Flow ──
    if (action.step === 'penalty_team_select') {
      const idx = parseInt(text) - 1;
      if (idx < 0 || idx >= action.teams.length) return bot.sendMessage(chatId, 'Invalid number');
      action.data.team = action.teams[idx];
      const progs = await Programme.find(siteFilter('default'));
      if (!progs.length) {
        action.step = 'penalty_prog_manual';
        return bot.sendMessage(chatId, 'No programmes. Enter programme name:');
      }
      action.progs = progs;
      let list = `*⚠️ ${escapeMd(action.data.team.name)}*\n\nSelect programme:\n\n`;
      progs.slice(0, 30).forEach((p, i) => {
        list += `${i + 1}\\. ${escapeMd(p.name)}\n`;
      });
      list += '\nSend number:';
      action.step = 'penalty_prog_select';
      return bot.sendMessage(chatId, list, { parse_mode: 'MarkdownV2' });
    }
    if (action.step === 'penalty_prog_select') {
      const idx = parseInt(text) - 1;
      if (idx < 0 || idx >= action.progs.length) return bot.sendMessage(chatId, 'Invalid number');
      action.data.programme = action.progs[idx];
      action.step = 'penalty_points';
      return bot.sendMessage(chatId,
        `*${escapeMd(action.data.team.name)}* \\| ${escapeMd(action.data.programme.name)}\n\nEnter penalty points to deduct:`,
        { parse_mode: 'MarkdownV2' }
      );
    }
    if (action.step === 'penalty_prog_manual') {
      action.data.programmeName = text;
      action.step = 'penalty_points';
      return bot.sendMessage(chatId, 'Enter penalty points to deduct:');
    }
    if (action.step === 'penalty_points') {
      action.data.points = parseInt(text);
      if (!action.data.points || action.data.points <= 0) return bot.sendMessage(chatId, 'Enter a valid positive number:');
      action.step = 'penalty_reason';
      return bot.sendMessage(chatId, 'Enter reason:');
    }
    if (action.step === 'penalty_reason') {
      const penalty = {
        id: 'pen-' + Date.now(),
        programmeId: action.data.programme ? action.data.programme.id : (action.data.programmeName || ''),
        teamId: action.data.team.id,
        points: action.data.points,
        reason: text,
        siteKey: 'default'
      };
      await Penalty.create(penalty);

      const newScore = Math.max(0, action.data.team.totalScore - action.data.points);
      await Team.updateOne({ _id: action.data.team._id }, { $set: { totalScore: newScore } });

      pendingActions.delete(chatId);
      return bot.sendMessage(chatId,
        `✅ *Penalty Added\\!*\n\n` +
        `👥 Team: ${escapeMd(action.data.team.name)}\n` +
        `📉 Deducted: *${action.data.points} pts*\n` +
        `📊 New Score: *${newScore}*\n` +
        `📝 Reason: ${escapeMd(text)}`,
        { parse_mode: 'MarkdownV2' }
      );
    }

    // ── Delete Penalty ──
    if (action.step === 'delpenalty_select') {
      const idx = parseInt(text) - 1;
      if (idx < 0 || idx >= action.penalties.length) return bot.sendMessage(chatId, 'Invalid number');
      const p = action.penalties[idx];
      await Penalty.deleteOne({ _id: p._id });
      const team = await Team.findOne({ ...siteFilter('default'), id: p.teamId });
      if (team) {
        await Team.updateOne({ _id: team._id }, { $set: { totalScore: team.totalScore + p.points } });
      }
      pendingActions.delete(chatId);
      return bot.sendMessage(chatId, `✅ Penalty removed, points restored`);
    }

  } catch (e) {
    console.error('Conversation error:', e.message);
    pendingActions.delete(chatId);
    bot.sendMessage(chatId, '❌ Error: ' + e.message);
  }
});

// ── Start ───────────────────────────────────────────────
async function start() {
  const dbOk = await connectDB();
  if (!dbOk) { console.error('Cannot start without MongoDB'); process.exit(1); }
  console.log('Bot started: @ThanafusDarsFestBot');
}

start();
process.on('unhandledRejection', (err) => console.error('Unhandled:', err.message));
