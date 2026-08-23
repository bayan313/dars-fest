const express = require('express');
const cors = require('cors');
const apiHandler = require('../api/all.js');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.all('/api/all', async (req, res) => {
  await apiHandler(req, res);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running purely on Telegram Engine at http://localhost:${PORT}`);
});
