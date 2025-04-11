const express = require('express');
const { signupController, loginController } = require('../controller/auth.controller');

const router = express.Router();

// User signup
router.post('/signup', signupController);

// User login
router.post('/login', loginController);

module.exports = router;