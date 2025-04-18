const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthController {
    // [GET] /auth/register
    showRegisterForm(req, res) {
        res.render('auth/register');
    }

    // [POST] /auth/register
    async register(req, res) {
        const { name, email, password } = req.body;
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.render('auth/register', { error: 'Email đã được sử dụng!' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ name, email, password: hashedPassword });
            await user.save();
            res.redirect('/auth/login');
        } catch (err) {
            console.error('Lỗi khi đăng ký:', err);
            res.status(500).send('Đã xảy ra lỗi!');
        }
    }

    // [GET] /auth/login
    showLoginForm(req, res) {
        res.render('auth/login');
    }

    // [POST] /auth/login
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.render('auth/login', { error: 'Email không tồn tại!' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.render('auth/login', { error: 'Mật khẩu không đúng!' });
            }

            // Tạo token và lưu vào cookie
            const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.cookie('token', token, { httpOnly: true });
            res.redirect('/');
        } catch (err) {
            console.error('Lỗi khi đăng nhập:', err);
            res.status(500).send('Đã xảy ra lỗi!');
        }
    }

    // [GET] /auth/logout
    logout(req, res) {
        res.clearCookie('token');
        res.redirect('/');
    }
}

module.exports = new AuthController();