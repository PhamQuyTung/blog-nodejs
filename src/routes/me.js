// File: src/routes/me.js
// File này được sử dụng để định nghĩa các tuyến đường liên quan đến me trong ứng dụng Express.js.

const express = require('express');
const router = express.Router();

// Import controller cho me
const meController = require('../app/controllers/MeController');

// Định nghĩa tuyến đường cho trang me
router.get('/stored/courses', meController.storedCourses);
router.get('/stored/news', meController.storedNews);

module.exports = router;
