// auth-server.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
app.use(cors());
app.use(express.json());

const SECRET = 'your_jwt_secret'; // Use env var in production
const db = new sqlite3.Database('./users.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    name TEXT
  )`);
});

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, row) => {
    if (row) return res.status(400).json({ error: 'Email exists' });
    const hash = await bcrypt.hash(password, 10);
    db.run('INSERT INTO users (email, password, name) VALUES (?, ?, ?)', [email, hash, name], function(err) {
      if (err) return res.status(500).json({ error: 'DB error' });
      res.json({ success: true });
    });
  });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ email: user.email, name: user.name }, SECRET, { expiresIn: '7d' });
    res.json({ token, name: user.name });
  });
});

// Auth check endpoint
app.get('/me', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });
  try {
    const user = jwt.verify(auth.split(' ')[1], SECRET);
    res.json(user);
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
});

app.listen(3002, () => console.log('Auth server running on http://localhost:3002'));
