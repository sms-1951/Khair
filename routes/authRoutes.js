// routes/authRoutes.js
// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// Login route
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

// Registration route
router.post('/register', authController.postRegister);
//logout route
router.post('/logout', authController.logout_post);

// Dashboard route; change later to home?
router.get('/charities', (req, res) => {
  res.render('charaties', { user: req.session.user });
});

module.exports = router;