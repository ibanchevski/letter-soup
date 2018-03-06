const mongoose = require('mongoose');

module.exports = mongoose.model('Puzzle', mongoose.Schema({
    teacher: String,
    creationDate: { type: Date, default: new Date() },
    words: Array,
    size: Number,
    code: String,
    title: String
}));