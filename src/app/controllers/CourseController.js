// File src/app/controller/NewController.js
// File này được sử dụng để định nghĩa các phương thức xử lý cho các tuyến đường liên quan đến trang chi tiết khóa học trong ứng dụng Express.js.

const Course = require('../models/Course');

class CourseController {
    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .lean() // Chuyển đổi dữ liệu thành Plain Object để Handlebars có thể xử lý
            .then((course) => {
                if (!course) {
                    return res.status(404).send('Course not found');
                }
                res.render('courses/show', { course });
            })
            .catch(next);
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    // [POST] /courses/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;

        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect('/?message=create-success'))
            .catch((error) => {
                if (error.name === 'ValidationError') {
                    return res
                        .status(400)
                        .render('courses/create', { error: 'Error!!!' });
                }
                next(error);
            });
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .lean()
            .then((course) => {
                if (!course) {
                    return res.status(404).send('Course not found');
                }
                res.render('courses/edit', { course });
            })
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)  // req.body là dữ liệu từ form và req.params.id là id của khóa học cần cập nhật
            .then(() => res.redirect('/me/stored/courses?message=update-success'))
            .catch(next);
    }

    // [DELETE] /courses/:id
    destroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('/me/stored/courses?message=delete-success'))
            .catch(next);
    }
}

module.exports = new CourseController();
