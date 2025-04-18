const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/AuthController');

// Đăng ký
router.get('/register', authController.showRegisterForm);   // Hiển thị form đăng ký
router.post('/register', authController.register);  // Xử lý đăng ký

// Đăng nhập
router.get('/login', authController.showLoginForm); // Hiển thị form đăng nhập
router.post('/login', authController.login); // Xử lý đăng nhập

// Đăng xuất
router.get('/logout', authController.logout);   // Xử lý đăng xuất

module.exports = router;