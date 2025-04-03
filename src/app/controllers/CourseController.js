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
}

module.exports = new CourseController();
