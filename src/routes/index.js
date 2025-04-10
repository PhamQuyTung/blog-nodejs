// mục đích để chuyển hết cấu hình tuyến đường app.get, app.post, ... vào trong file này
const newsRouter = require('./news'); // Import router từ file news.js
const coursesRouter = require('./courses'); // Import router từ file courses.js
const siteRouter = require('./site'); // Import router từ file site.js
const meRouter = require('./me'); // Import router từ file me.js
const port = 3005; // Default port

function route(app) {
    // Các dòng code xử lý tuyến đư��ng vào đây
    app.use('/news', newsRouter); // Sử dụng router cho tuyến đường news page `/news`
    app.use('/courses', coursesRouter); // Sử dụng router cho tuyến đường courses `/courses`
    app.use('/me', meRouter); // Sử dụng router cho tuyến đường me `/me`

    app.use('/', siteRouter); // Sử dụng router cho tuyến đường home page `/`

    app.listen(port, () => {
        console.log(`App listening on http://localhost:${port}`);
    });
}

module.exports = route; // Xuất ra hàm route để sử dụng trong file src/index.js
