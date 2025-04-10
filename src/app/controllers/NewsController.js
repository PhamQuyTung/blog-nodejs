// File src/app/controller/NewController.js
// File này được sử dụng để định nghĩa các phương thức xử lý cho các tuyến đường liên quan đến tin tức trong ứng dụng Express.js.

const NewModel = require('../models/New');
class NewsController {
    // [GET] /news
    index(req, res) {
        res.render('news');
    }

    // [GET] /news/:slug
    show(req, res, next) {
        NewModel.findOne({ slug: req.params.slug })
            .lean() // Chuyển đổi dữ liệu thành Plain Object để Handlebars có thể xử lý
            .then((news) => {
                if (!news) {
                    return res.status(404).send('New not found');
                }
                console.log(news.tags); // => xem có phải mảng không
                res.render('news/show', { news });
            })
            .catch(next);
    }

    // [GET] /news/create
    create(req, res) {
        res.render('news/create');
    }

    // [POST] /news/store nhận dữ liệu và lưu dữ liệu ở đây
    store(req, res, next) {
        const formData = req.body;

        // Tách chuỗi tags thành mảng (nếu có nhập)
        if (formData.tags) {
            formData.tags = formData.tags
                .split(',')
                .map((tag) => tag.trim())
                .filter((tag) => tag.length > 0); // bỏ tag rỗng nếu có
        }

        const newPage = new NewModel(formData);
        newPage
            .save()
            .then(() => res.redirect('/?message=create-news-success'))
            .catch((error) => {
                if (error.name === 'ValidationError') {
                    return res
                        .status(400)
                        .render('news/create', { error: 'Lỗi quá!!!' });
                }
                next(error);
            });
    }
}

module.exports = new NewsController();
