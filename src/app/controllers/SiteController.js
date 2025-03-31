// File src/app/controller/SiteController.js
// File này được sử dụng để định nghĩa các phương thức xử lý cho các tuyến đường không thuộc tài nguyên nào

class SiteController {
    // [GET] /
    index(req, res) {
        res.render('home');
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
