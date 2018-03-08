// Models
const WordCollectionModel = require('../models/WordsCollection');

// Modules and classes
const Q            = require('q');
const Teacher      = require('./Teacher');
const randomstring = require('randomstring');
const moment       = require('moment');
class Collection {
    constructor(teacherEmail, id) {
        this._teacherEmail = teacherEmail;
        this._id = id;
    }

    /**
     * Creates teacher collection
     * @param {string} teacherEmail The email of the teacher who created the collection
     * @param {string} title Collection's title
     * @param {array} words Collection's words array
     * @param {string} category Collection's category (OPTIONAL)
     * @returns {object} Created collection (Mongoose document object)
     */
    static createCollection(teacherEmail, title, words, category) {
        const deferred = Q.defer();
        const teacher = new Teacher(teacherEmail);
        const collection = new WordCollectionModel({
            title: String(title),
            words: words,
            teacher: String(teacherEmail),
            category: String(category) || '',
            creationDate: moment().utc().format()
        });

        collection.save(function (error, collectionDoc) {
            if (error) {
                deferred.reject(error);
                return;
            }

            teacher
                .addCollectionReference(collectionDoc._id)
                .then(function () {
                    deferred.resolve(collectionDoc);
                }, function (error) {

                });
        });

        return deferred.promise;
    }

    /**
     * Searches for teacher collection by given id
     * If no id is provided all teacher's collections are returned 
     */
    getCollections() {
        const deferred = Q.defer();
        const hasId = this._id !== undefined && this._id !== null;
        let searchQuery = {
            "teacher": this._teacherEmail
        };

        if (hasId) {
            searchQuery._id = this._id;
        };

        WordCollectionModel
            .find(searchQuery)
            .sort({ "creationDate": 'descending' })
            .then(function (collections) {
                if (hasId) {
                    // User probably request one specific collection
                    deferred.resolve(collections[0]);
                    return;
                }
                deferred.resolve(collections);
            }, function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    }

    /**
     * Updates collection details (title, category, words)
     * @param {string} title New collection's title
     * @param {array} words The update words array
     * @param {string} category Collection's new category
     */
    update(title, words, category) {
        const deferred = Q.defer();
        const updateQuery = {
            $set: {
                "title": title,
                "words": words,
                "category": category
            }
        };
        WordCollectionModel
            .findByIdAndUpdate(this._id)
            .update(updateQuery)
            .then(function (updatedCollection) {
                deferred.resolve(updatedCollection);
            }, function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    }

    /** 
     * Removes collection by given _id
    */
    deleteCollection() {
        const deferred = Q.defer();
        const teacher = new Teacher(this._teacherEmail);
        const self = this;
        WordCollectionModel
            .deleteOne({ "teacher": this._teacherEmail, "_id": this._id })
            .then(function () {
                deferred.resolve();
                teacher
                    .removeCollectionReference(self._id)
                    .then(null, function(error) {
                        console.log(error);
                    });
            }, function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    }
}
module.exports = Collection;