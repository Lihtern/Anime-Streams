const express = require('express');
const session = require('express-session');
const path = require('path');
const pool = require('./db');
const authRoutes = require('./routes/auth');
const subRoutes = require('./routes/subscribe');
const pageRoutes = require('./routes/pages');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: 'anime-secret', resave: false, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, '../public')));

pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(50) UNIQUE,
    password VARCHAR(128),
    plan VARCHAR(20)
  );
`);

app.use('/', authRoutes);
app.use('/', subRoutes);
app.use('/', pageRoutes);

// 🔽 ← перемещено сюда, после объявления app
app.get('/', (req, res) => {
  res.redirect('/catalog.html');
});

app.listen(3000, () => console.log('Server on http://localhost:3000'));
