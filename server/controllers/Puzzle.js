const Puzzle = require('../classes/Puzzle');
const MatrixGenerator = require('../modules/MatrixGenerator');

module.exports.validatePuzzleToken = function(req, res) {
    const puzzleCode = String(req.params.puzzleCode);
    Puzzle
        .validatePuzzleToken(puzzleCode)
        .then(function(isValid) {
            res.send(isValid);
        }, function(error) {
            res.status(500).send("Кода на пъзела е невалиден!");
        });
};