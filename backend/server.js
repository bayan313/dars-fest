const express = require('express');
const cors = require('cors');
const path = require('path');
const apiHandler = require('../api/all.js');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Shared database API (Telegram-backed JSON document)
app.all('/api/all', async (req, res) => {
  try {
    await apiHandler(req, res);
  } catch (e) {
    if (!res.headersSent) res.status(500).json({ error: e.message });
  }
});

const ROOT = path.join(__dirname, '..');

// Clean URLs → the matching page. Registered before the static handler so the
// served file is always deterministic (there are duplicate copies of a few
// pages for backwards compatibility).
const PAGES = {
  '/admin': 'admin/index.html',
  '/results': 'results.html',
  '/contact': 'contact.html',
  '/slide': 'slide.html',
  '/portal': 'portal.html',
  '/quiz': 'quiz.html',
  '/quiz-admin': 'quiz-admin.html',
  '/student': 'portal.html',
  '/ustad': 'portal.html'
};
Object.keys(PAGES).forEach((url) => {
  app.get(url, (req, res) => res.sendFile(path.join(ROOT, PAGES[url])));
});

// Serve static frontend files from the repository root
app.use(express.static(ROOT));

// Client-side routing fallback
app.use((req, res) => {
  res.sendFile(path.join(ROOT, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running purely on Telegram Engine at http://localhost:${PORT}`);
});
