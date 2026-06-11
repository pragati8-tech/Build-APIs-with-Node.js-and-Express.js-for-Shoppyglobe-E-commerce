// server.js
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware - JSON for body parse
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'ShoppyGlobe API is running!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});