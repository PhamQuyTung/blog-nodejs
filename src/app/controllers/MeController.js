// File src/app/controller/NewController.js
// File này được sử dụng để định nghĩa các phương thức xử lý cho các tuyến đường liên quan đến me trong ứng dụng Express.js.

const Course = require('../models/Course');
const New = require('../models/New');

class MeController {
    // [GET] /me/stored/courses
    // Phương thức này được sử dụng để lấy danh sách các khóa học đã lưu trong cơ sở dữ liệu và hiển thị chúng ra trang web
    storedCourses(req, res, next) {
        const limit = 5;
        const page = parseInt(req.query.page) || 1;
        const sortQuery = req.query.sort;

        const mapLevelToIndex = {
            'Dễ': 1,
            'Trung Bình': 2,
            'Khó': 3,
            'Pro': 4,
        };

        Course.find({})
            .lean()
            .then((allCourses) => {
                // Sắp xếp theo query
                if (sortQuery === 'level-asc') {
                    allCourses.sort((a, b) => mapLevelToIndex[a.level] - mapLevelToIndex[b.level]);
                } else if (sortQuery === 'level-desc') {
                    allCourses.sort((a, b) => mapLevelToIndex[b.level] - mapLevelToIndex[a.level]);
                } else if (sortQuery === 'price-asc') {
                    allCourses.sort((a, b) => a.cost - b.cost);
                } else if (sortQuery === 'price-desc') {
                    allCourses.sort((a, b) => b.cost - a.cost);
                } else if (sortQuery === 'name-asc') {
                    allCourses.sort((a, b) => a.name.localeCompare(b.name));
                } else if (sortQuery === 'name-desc') {
                    allCourses.sort((a, b) => b.name.localeCompare(a.name));
                } else if (sortQuery === 'oldest') {
                    allCourses.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                } else {
                    allCourses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // newest
                }

                const totalCourses = allCourses.length;
                const totalPages = Math.ceil(totalCourses / limit);

                const paginatedCourses = allCourses.slice(
                    (page - 1) * limit,
                    page * limit
                );

                res.render('me/stored-courses', {
                    courses: paginatedCourses,
                    currentPage: page,
                    totalPages,
                    limit,
                    query: { sort: sortQuery },
                });
            })
            .catch(next);
    }

    // [GET] /me/stored/news
    // Phương thức này được sử dụng để lấy danh sách các tin tức đã lưu trong cơ sở dữ liệu và hiển thị chúng ra trang web
    storedNews(req, res, next) {
        const limit = 5;
        const page = parseInt(req.query.page) || 1;
        const sortQuery = req.query.sort;

        New.find({})
            .lean() // Chuyển đổi dữ liệu thành Plain Object để Handlebars có thể xử lý
            .then((allNews) => {
                // Sắp xếp theo query
                // if (sortQuery === 'title-asc') {
                //     allNews.sort((a, b) => a.title.localeCompare(b.title));
                // } else if (sortQuery === 'title-desc') {
                //     allNews.sort((a, b) => b.title.localeCompare(a.title));
                // } else if (sortQuery === 'oldest') {
                //     allNews.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                // } else {
                //     allNews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // blog newest
                // }

                const totalNews = allNews.length;
                const totalPages = Math.ceil(totalNews / limit);
        
                const paginatedNews = allNews.slice(
                    (page - 1) * limit,
                    page * limit
                );

                res.render('me/stored-news', {
                    news: paginatedNews,
                    currentPage: page,
                    totalPages,
                    limit,
                    query: { sort: sortQuery },
                });
            })
            .catch(next);
    }
}

module.exports = new MeController();

