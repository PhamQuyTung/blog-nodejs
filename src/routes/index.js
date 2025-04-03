// mục đích để chuyển hết cấu hình tuyến đường app.get, app.post, ... vào trong file này
const newsRouter = require('./news'); // Import router từ file news.js
const siteRouter = require('./site'); // Import router từ file site.js
const port = 3003; // Default port

function route(app) {
    // Các dòng code xử lý tuyến đư��ng vào đây
    app.use('/news', newsRouter); // Sử dụng router cho tuyến đường news page `/news`

    app.use('/', siteRouter); // Sử dụng router cho tuyến đường home page `/`

    app.listen(port, () => {
        console.log(`App listening on http://localhost:${port}`);
    });
}

module.exports = route; // Xuất ra hàm route để sử dụng trong file src/index.js
