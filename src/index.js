const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./app/middlewares/authMiddleware');
const authRoutes = require('./routes/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const setUser = require('./app/middlewares/setUser');

const db = require('./config/db');
const handlebarsHelpers = require('./utils/handlebars');
const route = require('./routes');
const dotenv = require('dotenv');

// Sử dụng dotenv để quản lý biến môi trường
dotenv.config();

// Khởi tạo ứng dụng
const app = express();

// ---------------------------
// KẾT NỐI DATABASE
// ---------------------------
db.connect();

// ---------------------------
// MIDDLEWARES
// ---------------------------

// Cho phép override method qua query _method (hỗ trợ PUT, DELETE qua form HTML)
app.use(methodOverride('_method'));

// Static files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, 'public')));

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Parse application/json
app.use(express.json());

// HTTP logger
app.use(morgan('combined'));

// Sử dụng cookie-parser để đọc cookie
app.use(cookieParser());

// Sử dụng middleware xác thực cho toàn bộ ứng dụng
app.use(authMiddleware);

// Gắn thông tin người dùng vào tất cả các view
app.use(setUser);

// ---------------------------
// VIEW ENGINE - HANDLEBARS
// ---------------------------
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: handlebarsHelpers,
    })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

console.log('Views path:', path.join(__dirname, 'resources', 'views'));

// ---------------------------
// ROUTES INIT
// ---------------------------
route(app);

// Sử dụng route auth
app.use('/auth', authRoutes);
