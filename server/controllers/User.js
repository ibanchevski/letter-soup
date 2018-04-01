const User = require('../classes/User');
const Puzzle = require('../classes/Puzzle');
const CookieParser = require('../modules/CookiesParser');
const jwt = require('jsonwebtoken');
const config = require('../config');

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

module.exports.submitPuzzle = function(req, res) {
    const cookies = CookieParser.parseCookies(req.headers.cookie);
    const puzzleCode = String(req.body.puzzleCode);
    const solvedWordsNumber = Number(req.body.solvedWords);
    const userCookie = cookies.find(function (cookie) {
        return cookie.name === '_u';
    });

    // Get user info from the cookie
    jwt.verify(userCookie.value, config.tokenSecret, function (error, decoded) {
        if (error) {
            res.status(400).send('Възникна грешка! Моля, впишете името си и решете пъзела отначало!');
            return;
        }
     
        Puzzle
            .submitSolvedPuzzle(puzzleCode, decoded, solvedWordsNumber)
            .then(function() {
                res.send();
            }, function(error) {
                res.status(500).send(error);
            });
    });
};