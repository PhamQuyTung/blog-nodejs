const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.cookies.token; // Lấy token từ cookie
    if (!token) {
        req.user = null; // Không có token, không có người dùng
        console.log('Người dùng hiện tại:', req.user);
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Giải mã token
        req.user = decoded; // Gắn thông tin người dùng vào req
        console.log('Người dùng hiện tại:', req.user);
        next();
    } catch (err) {
        console.error('Lỗi xác thực token:', err);
        req.user = null;
        console.log('Người dùng hiện tại:', req.user);
        next();
    }
};