// File: src/routes/courses.js
// File này được sử dụng để định nghĩa các tuyến đường liên quan đến trang chi tiết khóa học trong ứng dụng Express.js.

const express = require('express');
const router = express.Router();

// Import controller cho tin tức
const courseController = require('../app/controllers/CourseController');

// Định nghĩa tuyến đường cho trang chi tiết tin tức
router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:id/edit', courseController.edit);
router.put('/:id/', courseController.update);
router.get('/:slug', courseController.show);
router.delete('/:id', courseController.delete);

module.exports = router;
