// Models
const CollectionModel = require('../models/WordsCollection');
const PuzzleModel     = require('../models/Puzzle');

// Modules and classes
const Q            = require('q');
const randomstring = require('randomstring');

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

    /**
     * Creates a puzzle by given words and size
     * @param {string} teacher The email of the teacher who creates the puzzle
     * @param {array} words The puzzle's words array
     * @param {number} size The puzzle's size
     */
    static createPuzzle(teacher, words, size) {
        const deferred = Q.defer();
        const puzzleCode = randomstring.generate(8);
        const pzl = new PuzzleModel({
            teacher: String(teacher),
            size: Number(size),
            words: words,
            code: puzzleCode
        });

        pzl.save(function(error) {
            if (error) {
                deferred.reject(error);
                return;
            }
            deferred.resolve();
        });
        
        return deferred.promise;
    }
}
module.exports = Puzzle;