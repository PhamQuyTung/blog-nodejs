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

    // [GET] /news/:id/edit
    edit(req, res, next) {
        NewModel.findById(req.params.id)
            .lean()
            .then((news) => {
                if (!news) {
                    return res.status(404).send('New not found');
                }
                res.render('news/edit', { news });
            })
            .catch(next);
    }

    // [PUT] /news/:id
    update(req, res, next) {
        const formData = req.body;

        // Tách chuỗi tags thành mảng (nếu có nhập)
        if (formData.tags) {
            formData.tags = formData.tags
                .split(',')
                .map((tag) => tag.trim())
                .filter((tag) => tag.length > 0); // bỏ tag rỗng nếu có
        }

        NewModel.updateOne({ _id: req.params.id }, formData)
            .then(() => res.redirect('/me/stored/news/?message=update-new-success'))
            .catch(next);
    }

    // [DELETE] /news/:id
    destroy(req, res, next) {
        NewModel.delete({ _id: req.params.id })
            .then(() => res.redirect('/me/stored/news?message=delete-new-success'))
            .catch(next);
    }

    // [GET] /news/trash
    trash(req, res, next) {
        NewModel.findDeleted()
            .lean()
            .then((news) => {
                res.render('/me/trash/news', { news });
            })
            .catch(next);
    }

    // [PATCH] /news/:id/restore
    // Khôi phục bài viết đã xóa
    // Sử dụng phương thức restore của mongoose-delete
    // Để khôi phục bài viết đã xóa
    // Cập nhật trường deleted thành false
    restore(req, res, next) {
        NewModel.restore({ _id: req.params.id })
            .then(() => {
                return NewModel.updateOne(
                    { _id: req.params.id },
                    { deleted: false },
                );
            })
            .then(() => res.redirect('/me/trash/news?message=restore-new-success'))
            .catch(next);
    }

    // [DELETE] /news/:id/force
    forceDelete(req, res, next) {
        NewModel.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('/me/trash/news?message=delete-new-success'))
            .catch(next);
    }
}

module.exports = new NewsController();
