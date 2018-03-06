const mongoose = require('mongoose');

module.exports = mongoose.model('WordsCollection', mongoose.Schema({
    title: String,
    words: Array,
    category: String,
    teacher: String,
    solveId: String,
    creationDate: { type: Date, default: new Date() }
}));