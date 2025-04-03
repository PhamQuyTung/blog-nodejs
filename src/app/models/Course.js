const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Course = new Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 255,
  },
  description: {
    type: String,
    minlength: 5,
    maxlength: 600,
  },
  image: {
    type: String,
    minlength: 5,
    maxlength: 255,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Course", Course);