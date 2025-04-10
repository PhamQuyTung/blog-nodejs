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
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
