
const express = require('express');
const router = express.Router();

const { registerUser,loginUser } = require('../controllers/authController');

// POST /register - Register a new user
router.post('/register', registerUser);

// POST /login - Login the user
router.post('/login', loginUser);

module.exports = router;