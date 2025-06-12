const express = require('express');
const pool = require('../db');
const router = express.Router();

router.post('/subscribe', async (req, res) => {
  if (!req.session.user) return res.redirect('/login.html');
  const plan = req.body.plan;
  try {
    await pool.query('UPDATE users SET plan = $1 WHERE id = $2', [plan, req.session.user.id]);
    res.send('Подписка оформлена: ' + plan);
  } catch (err) {
    console.error(err);
    res.send('Ошибка при оформлении подписки');
  }
});

module.exports = router;
