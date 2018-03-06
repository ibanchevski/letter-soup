// Models
const CollectionModel = require('../models/WordsCollection');

// Modules and classes
const Q = require('q');

class Puzzle {
    constructor (puzzleCode) {
        this._puzzleCode = puzzleCode;
    }

    static validatePuzzleToken (code) {
        const deferred = Q.defer()

        CollectionModel.findOne({ link: code }, function(error, collection) {
            if (error) {
                deferred.reject(error);
                return;
            }
            if (collection === null) {
                deferred.reject(new Error('No collection found!'));
                return;
            }
            deferred.resolve(collection);
        });

        return deferred.promise;
    }
}
module.exports = Puzzle;