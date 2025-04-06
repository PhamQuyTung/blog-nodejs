// File src/app/controller/NewController.js
// File này được sử dụng để định nghĩa các phương thức xử lý cho các tuyến đường liên quan đến me trong ứng dụng Express.js.

const Course = require('../models/Course');

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        // Sử dụng Course.find() để lấy tất cả các khóa học từ cơ sở dữ liệu
        Course.find({})
           .lean() // Chuyển đ��i dữ liệu thành Plain Object để Handlebars có thể xử lý
           .then((courses) => {
               res.render('me/stored-courses', { courses });
           })
           .catch(next);
    }

    // // [GET] /me/trash/courses
    // trashCourses(req, res) {
    //     res.render('me/trash-courses');
    // }
}

module.exports = new MeController();
