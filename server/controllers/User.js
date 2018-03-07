const User = require('../classes/User');
const Puzzle = require('../classes/Puzzle');

module.exports.createTempUser = function(req, res) {
    const token = User.createTempUser(req.body.user);
    res.send(token);
};

module.exports.getPuzzle = function(req, res) {
    if (req.params.puzzleCode === 'undefined') {
        res.status(400).send('Код на пъзела не е намерен!');
        return;
    }
    Puzzle
        .generatePuzzle(req.params.puzzleCode)
        .then(function(puzzleObj) {
            res.json(puzzleObj);
        }, function(error) {
            console.log(error);
            res.status(500).send('Грешка при генерирането на пъзела!');
        });
};