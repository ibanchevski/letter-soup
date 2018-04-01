// Models
const CollectionModel    = require('../models/WordsCollection');
const PuzzleModel        = require('../models/Puzzle');
const PuzzleSolversModel = require('../models/PuzzleSolvers');

// Modules and classes
const Q               = require('q');
const randomstring    = require('randomstring');
const MatrixGenerator = require('../modules/MatrixGenerator');
const moment          = require('moment');

class Puzzle {
    constructor (puzzleCode, teacher, puzzleId) {
        this._puzzleCode = puzzleCode;
        this._teacher = teacher;
        this._id = puzzleId;
    }

    static validatePuzzleToken (code) {
        const deferred = Q.defer()

        PuzzleModel.findOne({ code: code }, function(error, collection) {
            if (error) {
                deferred.reject(error);
                return;
            }
            if (collection === null) {
                // Invalid code
                deferred.resolve(false);
                return;
            }
            deferred.resolve(true);
        });

        return deferred.promise;
    }

    /**
     * Creates a puzzle by given words and size
     * @param {string} teacher The email of the teacher who creates the puzzle
     * @param {array} words The puzzle's words array
     * @param {number} size The puzzle's size
     * @param {string} title The puzzle's title
     */
    static createPuzzle(teacher, words, size, title) {
        const deferred = Q.defer();
        const puzzleCode = randomstring.generate(8);
        const pzl = new PuzzleModel({
            title: String(title),
            teacher: String(teacher),
            size: Number(size),
            words: words,
            code: puzzleCode,
            creationDate: moment().utc().format()
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

    /**
     * Get all teacher's puzzles.
     * If puzzle id is provided the specific puzzle would be returned
     */
    getPuzzle() {
        const deferred = Q.defer();
        const self = this;
        const searchQuery = {
            "teacher": this._teacher
        };
        if (this._id !== undefined) {
            searchQuery._id = this._id;
        }
        PuzzleModel.find(searchQuery, function(error, puzzles) {
            if (error) {
                deferred.reject(error);
                return;
            }
            if (self._id !== undefined) {
                // User probably wanted one specific puzzle
                deferred.resolve(puzzles[0]);
                return;
            }
            deferred.resolve(puzzles);
        }).sort({"creationDate": 'descending'});
        return deferred.promise;
    }

    deletePuzzle() {
        const deferred = Q.defer();
        PuzzleModel.deleteOne({"teacher": this._teacher, "_id": this._id}, function(error) {
            if (error) {
                deferred.reject(error);
                return;
            }
            deferred.resolve();
        });
        return deferred.promise;
    }

    /**
     * Generates puzzle by given code
     * @param {string} code The code of the puzzle
     */
    static generatePuzzle(code) {
        const deferred = Q.defer();
        let generatedPuzzle;
        let config = {};
        PuzzleModel.findOne({ "code": code }, function(error, puzzle) {
            if (error) {
                deferred.reject(error);
                return;
            }
            if (puzzle === null) {
                deferred.reject(new Error('No puzzle found!'));
                return;
            }
            
            config.h = puzzle.size;
            config.w = puzzle.size;
            config.words = puzzle.words;
            config.fill = true;
            // Generate puzzle
            generatedPuzzle = MatrixGenerator.createPuzzle(config);
            deferred.resolve({
                puzzle: generatedPuzzle.puzzle,
                title: puzzle.title,
                correctWords: generatedPuzzle.placedWords
            });
        });

        return deferred.promise;
    }

    static submitSolvedPuzzle(puzzleCode, user, solvedWords) {
        const deferred = Q.defer();
        new PuzzleSolversModel({
            puzzleCode: puzzleCode,
            user: user,
            solvedWords: solvedWords
        }).save(function(error) {
            if (error) {
                console.log(error);
            }
            deferred.resolve();
        });
        return deferred.promise;
    }

    getPuzzleSolvers() {
        const deferred = Q.defer();
        this
            .getPuzzle()
            .then(function(puzzle) {
                console.log(puzzle);
                PuzzleSolversModel.find({ puzzleCode: puzzle.code }, function (error, solvers) {
                    if (error) {
                        deferred.reject(error);
                        return;
                    }
                    deferred.resolve(solvers);
                }).sort({ date: 'descending' });
            }, function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    }

    generatePuzzleCode() {
        const deferred = Q.defer();
        const newCode = randomstring.generate(8);
        
        PuzzleModel.findByIdAndUpdate(this._id, { $set: { code: newCode } }, function(error) {
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