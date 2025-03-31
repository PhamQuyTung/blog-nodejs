// File src/app/controller/NewController.js
// File này được sử dụng để định nghĩa các phương thức xử lý cho các tuyến đường liên quan đến tin tức trong ứng dụng Express.js.

class NewsController {
    // [GET] /news
    index(req, res) {
        res.render('news');
    }

    // [GET] /news/:slug
    show(req, res) {
        res.send('News Detail!!!');
    }
}

module.exports = new NewsController();
