const mongoose = require('mongoose');

module.exports = mongoose.model('Teacher', mongoose.Schema({
    firstName: String,
    lastName: String,
    city: String,
    school: String,
    email: { type: String, unique: true },
    password: String,
    subjects: Array,
    registrationDate: {type: Date, default: new Date()},
    wordCollections: Array
}));