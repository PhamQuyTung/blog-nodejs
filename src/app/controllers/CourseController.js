// File src/app/controller/NewController.js
// File này được sử dụng để định nghĩa các phương thức xử lý cho các tuyến đường liên quan đến trang chi tiết khóa học trong ứng dụng Express.js.

const Course = require('../models/Course');

class CourseController {
    // [GET] /courses/:slug
    // Hiển thị chi tiết khóa học
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
    // Hiển thị trang tạo khóa học
    create(req, res, next) {
        res.render('courses/create');
    }

    // [POST] /courses/store
    // Lưu khóa học mới vào cơ sở dữ liệu
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;

        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect('/?message=create-course-success'))
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
    // Hiển thị trang chỉnh sửa khóa học
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
    // Cập nhật khóa học
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body) // req.body là dữ liệu từ form và req.params.id là id của khóa học cần cập nhật
            .then(() =>
                res.redirect('/me/stored/courses?message=update-course-success')
            )
            .catch(next);
    }

    // [DELETE] /courses/:id
    // Xóa mềm khóa học
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() =>
                res.redirect('/me/stored/courses?message=delete-course-success')
            )
            .catch(next);
    }

    // [DELETE] /courses/:id/force
    // Xóa vĩnh viễn khóa học
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() =>
                res.redirect('/me/trash/courses?message=delete-course-success')
            )
            .catch(next);
    }

    // [GET] /courses/trash
    // Hiển thị danh sách khóa học đã xóa
    trash(req, res, next) {
        Course.findDeleted()
            .lean()
            .then((courses) => {
                res.render('/me/trash/courses', { courses });
            })
            .catch(next);
    }

    // [PATCH] /courses/:id/restore
    // Khôi phục khóa học đã xóa
    // Sử dụng phương thức restore của mongoose-delete
    // Để khôi phục khóa học đã xóa
    // Cập nhật trường deleted thành false
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => {
                return Course.updateOne(
                    { _id: req.params.id },
                    { deleted: false },
                );
            })
            .then(() => res.redirect('/me/trash/courses?message=restore-course-success'))
            .catch(next);
    }
}

module.exports = new CourseController();
