const express = require('express');
const router = express.Router();

router.get('/catalog.html', (req, res, next) => {
  if (!req.session.user) return res.redirect('/login.html');
  next();
});

router.get('/watch.html', (req, res, next) => {
  if (!req.session.user) return res.redirect('/login.html');
  next();
});

module.exports = router;
