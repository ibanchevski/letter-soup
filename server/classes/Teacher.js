const TeacherModel = require('../models/Teacher');
const WordsCollectionModel = require('../models/WordsCollection');

const Q = require('q');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../config');
const saltRounds = 8;

class Teacher {
    constructor(email) {
        this._email = email;
    }

    /**
     * Registers new teacher by given teacherObject
     * @param {Object} teacherObject The object containig all teacher's data (name, school, subject, etc.)
     */
    static register(teacherObject) {
        const deferred = Q.defer();

        // Hash teacher's password
        const teacherPassword = bcrypt.hashSync(teacherObject.password, saltRounds);
        TeacherModel.count({"email": teacherObject.email}, function(error, count) {
            if (error) {
                deferred.reject(error);
                return;
            }
            
            if (count !== 0) {
                deferred.reject('Вече съществува регистриран потребител с този email адрес!');
                return;
            }

            // Create the teacher record
            new TeacherModel({
                firstName: String(teacherObject.firstName),
                lastName: String(teacherObject.lastName),
                city: String(teacherObject.city),
                school: String(teacherObject.school),
                email: String(teacherObject.email),
                password: teacherPassword,
                subjects: [teacherObject.subject]
            }).save(function(error) {
                if (error) {
                    // TODO: Handle errror
                    deferred.reject(error);
                    return;
                }
                deferred.resolve('Регистрацията успешна!');
            });
        });

        return deferred.promise;
    }

    /**
     * Authenticate a teacher with given email and password
     * @param {string} email Teacher's email
     * @param {string} password Teacher's password
     */
    static authenticate(email, password) {
        const deferred = Q.defer();
        let teacherToken;
        TeacherModel.findOne({"email": String(email)}, function(error, teacherDoc) {
            let matchingPassword;
            if (error) {
                deferred.reject(error);
                return;
            }
            if (teacherDoc === null) {
                deferred.reject(new Error('Няма регистриран учител с този email адрес!'))
                return;
            }
            matchingPassword = bcrypt.compareSync(password, teacherDoc.password);
            if (matchingPassword === false) {
                deferred.reject(new Error('Грешен email адрес или парола!'))
                return;
            }
            
            // Sign new token that expires in 8 hours
            teacherToken = jwt.sign({ email: teacherDoc.email }, config.tokenSecret, { expiresIn: '8h' });
            deferred.resolve(teacherToken);
        });

        return deferred.promise;
    }

    /**
     * Creates a teacher collection by given collection object, which holds
     * all the necessary data about the collection
     * @param {object} collectionObj Containing collections' title, words and category
     */
    createCollection(collectionObj) {
        const deferred = Q.defer();
        const self = this;
        collectionObj.teacher = this._email;
        const wordsColl = new WordsCollectionModel({
            title: String(collectionObj.title),
            teacher: String(this._email),
            words: collectionObj.words,
            category: String(collectionObj.category) || ''
        });

        wordsColl.save(function(error, collectionDoc) {
            if (error) {
                // TODO: Add error handler (logger?)
                deferred.reject('Грешка! Моля, опитайте пак!');
                return;
            }

            // Add reference of the collection to the teacher model
            TeacherModel
                .updateOne({ "email": self._email }, { $push: { wordCollections: collectionDoc._id } }, function(error) {
                    if (error) {
                        // TODO: Handle the error
                    }
                    deferred.resolve();
                });
        });

        return deferred.promise;
    }

    getAllCollections() {
        const deferred = Q.defer();

        TeacherModel.findOne({ "email": this._email }, 'wordCollections', function(error, teacherDoc) {
            if (error) {
                deferred.reject(new Error('Грешка при изтеглянето на колекциите!'));
                return;
            }
            WordsCollectionModel.find({ "_id": { $in:  teacherDoc.wordCollections} }, function(error, wordCollections) {
                if (error) {
                    deferred.reject(new Error('Грешка при изтеглянето на колекциите!'));
                    return;
                }
                deferred.resolve(wordCollections);
            });
        });

        return deferred.promise;
    }
}
module.exports = Teacher;