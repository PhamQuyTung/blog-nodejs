// File: src/routes/site.js
// File này được sử dụng để định nghĩa các tuyến đường không thuộc tài nguyên nào 

const express = require("express");
const router = express.Router();

// Import controller cho tin tức
const siteController = require('../app/controllers/SiteController'); 

// Định nghĩa tuyến đường cho trang search
router.use('/search', siteController.search);
// Định nghĩa tuyến đường cho trang home
router.use('/', siteController.index);

module.exports = router;
