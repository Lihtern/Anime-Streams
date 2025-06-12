const express = require('express');
const pool = require('../db');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.send('Пользователь уже существует');
    }
    await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
      [username, email, password]
    );
    res.redirect('/login.html');
  } catch (err) {
    console.error(err);
    res.send('Ошибка сервера');
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRes = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
    if (userRes.rows.length === 0) {
      return res.send('Неверный логин или пароль');
    }
    req.session.user = userRes.rows[0];
    res.redirect('/catalog.html');
  } catch (err) {
    console.error(err);
    res.send('Ошибка сервера');
  }
});

module.exports = router;
