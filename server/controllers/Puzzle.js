const Puzzle = require('../classes/Puzzle');
const MatrixGenerator = require('../modules/MatrixGenerator');

module.exports.validatePuzzleToken = function(req, res) {
    const puzzleCode = req.params.puzzleCode;
    Puzzle
        .validatePuzzleToken(puzzleCode)
        .then(function onValidPuzzle(collection) {
            // Generate matrix
        }, function(error) {
            res.status(500).send("Кода на пъзела е невалиден!");
        });
};