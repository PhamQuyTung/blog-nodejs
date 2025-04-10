// File: src/routes/news.js
// File này được sử dụng để định nghĩa các tuyến đường liên quan đến tin tức trong ứng dụng Express.js.

const express = require('express');
const router = express.Router();

// Import controller cho tin tức
const newsController = require('../app/controllers/NewsController');

// Định nghĩa tuyến đường cho trang tạo tin tức
router.get('/create', newsController.create);

// Định nghĩa tuyến đường cho trang chỉnh sửa tin tức
router.post('/store', newsController.store);

// Định nghĩa tuyến đường cho trang chi tiết tin tức
router.get('/:slug', newsController.show);

// Định nghĩa tuyến đường cho trang tin tức
router.get('/', newsController.index);

module.exports = router;
