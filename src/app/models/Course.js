const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        image: { type: String },
        slug: { type: String, unique: true },
        videoId: { type: String, required: true },
        level: { type: String, required: true },
        cost: { type: String },
        slug: { type: String, slug: 'name' },
    },
    {
        timestamps: true,
    }
);

// Tạo slug từ trường title
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

// Add soft delete plugin
var mongooseDelete = require('mongoose-delete');
Course.plugin(mongooseDelete, {
    overrideMethods: 'all', // Tất cả các phương thức sẽ được ghi đè
    deletedAt: true, // Thêm trường deletedAt
    // validateBeforeDelete: false, // Bỏ qua xác thực trước khi xóa
});

module.exports = mongoose.model('Course', Course);
