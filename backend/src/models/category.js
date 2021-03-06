const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 32,
    unique: true,
  },
}, {
  timestamps: true,
});

let User = mongoose.model("Category", categorySchema);

module.exports = User;