const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Tạo slug từ trường title
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const News = new Schema(
    {
        title: {
            type: String,
        },
        slug: {
            type: String,
            unique: true,
            slug: 'title', // Tạo slug từ trường title
        },
        summary: {
            type: String,
        },
        content: {
            type: String,
        },
        thumbnail: {
            type: String,
        },
        // author: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'User', // Nếu có bảng users
        //     // required: true,
        // },
        category: {
            type: String, // hoặc mongoose.Schema.Types.ObjectId nếu có bảng categories
        },
        tags: [String],
        // // Các trường tự động linh hoạt
        // status: {
        //     type: String,
        //     enum: ['draft', 'published', 'archived'],
        //     default: 'draft',
        // },
        // views: {
        //     type: Number,
        //     default: 0,
        // },
        // likes: {
        //     type: Number,
        //     default: 0,
        // },
        // commentsCount: {
        //     type: Number,
        //     default: 0,
        // },
        // // Tự động thêm
        // publishedAt: Date,
    },
    {
        timestamps: true, // Tự động thêm createdAt và updatedAt
    }
);

module.exports = mongoose.model('News', News);
