const mongoose = require('mongoose');

module.exports = mongoose.model('PuzzleSolvers', mongoose.Schema({
    puzzleCode: String,
    user: String,
    solvedWords: Number,
    date: { type: Date, default: new Date() }
}));