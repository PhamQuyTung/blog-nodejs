const Course = require('../models/Course');
const New = require('../models/New'); // THÊM DÒNG NÀY

class SiteController {
    // [GET] /
    index(req, res, next) {
        Promise.all([Course.find({}).lean(), New.find({}).lean()])
            .then(([courses, news]) => {
                res.render('home', { courses, news }); // TRUYỀN CẢ HAI DỮ LIỆU
            })
            .catch(next);
    }

    // [GET] /search
    search(req, res, next) {
        const query = req.query.q || '';
        const category = req.query.category || '';
        const filter = category ? { category } : {};
        const page = parseInt(req.query.page) || 1;
        const limit = 10; // Số lượng kết quả mỗi trang
        const skip = (page - 1) * limit;

        const sort = req.query.sort || 'newest';
        let sortOption = {};
        if (sort === 'newest') sortOption = { createdAt: -1 };
        if (sort === 'popular') sortOption = { views: -1 };
        if (sort === 'rating') sortOption = { rating: -1 };

        if (!query) {
            // Nếu không có từ khóa, chỉ render trang tìm kiếm
            return res.render('search', { courses: [], news: [], query });
        }

        Promise.all([
            Course.find({
                // Thêm điều kiện lọc theo danh mục
                // Nếu có category, thêm điều kiện lọc theo category
                // Nếu không có category, bỏ qua điều kiện này
                ...filter,
                $or: [
                    { name: new RegExp(query, 'i') },
                    { description: new RegExp(query, 'i') },
                    { author: new RegExp(query, 'i') },
                ],
            })
                .sort(sortOption)
                .skip(skip)
                .limit(limit)
                .lean(),
            // Tìm kiếm trong bảng tin tức
            // Thêm điều kiện lọc theo danh mục
            // Nếu có category, thêm điều kiện lọc theo category
            // Nếu không có category, bỏ qua điều kiện này
            New.find({
                $or: [
                    { title: new RegExp(query, 'i') },
                    { content: new RegExp(query, 'i') },
                    { tags: new RegExp(query, 'i') },
                ],
            })
                .skip(skip)
                .limit(limit)
                .lean(),
            // Đếm tổng số kết quả tìm kiếm trong bảng khóa học    
            Course.countDocuments({
                ...filter,
                $or: [
                    { name: new RegExp(query, 'i') },
                    { description: new RegExp(query, 'i') },
                    { author: new RegExp(query, 'i') },
                ],
            }),
            // Đếm tổng số kết quả tìm kiếm trong bảng tin tức
            New.countDocuments({
                $or: [
                    { title: new RegExp(query, 'i') },
                    { content: new RegExp(query, 'i') },
                    { tags: new RegExp(query, 'i') },
                ],
            }),
        ])
            .then(([courses, news, totalCourses, totalNews]) => {
                res.render('search', {
                    courses,
                    news,
                    query,
                    currentPage: page,
                    totalPages: Math.ceil((totalCourses + totalNews) / limit),
                });
            })
            .catch(next);
    }

    // [GET] /api/suggestions
    suggestions(req, res, next) {
        const query = req.query.q || '';
        Promise.all([
            Course.find({ name: new RegExp(query, 'i') }).limit(5).lean(),
            New.find({ title: new RegExp(query, 'i') }).limit(5).lean(),
        ])
            .then(([courses, news]) => {
                const suggestions = [...courses, ...news];
                res.json(suggestions);
            })
            .catch(next);
    }
}

module.exports = new SiteController();
