const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  getCurrentUser,
  updateProfile,
  changePassword,
} = require('./auth.controller');
const { registerValidation, loginValidation } = require('./auth.validation');
const { protect } = require('../../middlewares/auth.middleware');
const upload = require('../../middlewares/upload.middleware');

// Public Routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

// Authenticated Routes
router.post('/logout', protect, logout);
router.get('/me', protect, getCurrentUser);
router.put('/profile', protect, upload.single('avatar'), updateProfile);
router.put('/change-password', protect, changePassword);

module.exports = router;
