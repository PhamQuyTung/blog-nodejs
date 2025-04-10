const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

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

module.exports = mongoose.model('Course', Course);
