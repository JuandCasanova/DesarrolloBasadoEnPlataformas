const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// 1. Ruta de REGISTRO (POST /api/auth/register)
router.post('/register', authController.register);

// 2. Ruta de LOGIN (POST /api/auth/login)
router.post('/login', authController.login);

// 3. Ruta de VERIFICACIÓN de Email (GET /api/auth/verify-email?token=...)
router.get('/verify-email', authController.verifyEmail);

module.exports = router;