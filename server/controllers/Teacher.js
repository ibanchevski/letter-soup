const Teacher    = require('../classes/Teacher');
const Collection = require('../classes/Collection');
const Puzzle     = require('../classes/Puzzle');

module.exports.registerTeacher = function(req, res) {
    //TODO: Validate input!
    Teacher.register(req.body.teacher)
        .then(function(response) {
            res.send(response);
        }, function(error) {
            // TODO: Handle error
            res.status(500).send(error);
        });
};

module.exports.login = function(req, res) {
    Teacher.authenticate(req.body.email, req.body.password)
        .then(function(response) {
            res.send(response);
        }, function(error) {
            res.status(500).send(error.message);
        });
};

module.exports.createCollection = function(req, res) {
    const title = String(req.body.collection.title);;
    const category = String(req.body.collection.category);;
    const words = req.body.collection.words.map(function (word) {
        return String(word);
    });
    Collection
        .createCollection(req.decoded.email, title, words, category)
        .then(function(collection) {
            res.send("Колекцията е създадена успешно!");
        }, function(error) {
            // TODO: Log error
            res.status(500).send('Възникна грешка при създаване на колекцията!');
        });
};

// Gets collection by id if no id is provided all teacher's collections are returned
module.exports.getCollection = function(req, res) {
    const collectionId = req.params.collectionId === undefined 
        ? undefined
        : String(req.params.collectionId);
    const collection = new Collection(req.decoded.email, collectionId);
    collection
        .getCollections()
        .then(function(collections) {
            res.send(collections);
        }, function(error) {
            cosole.log(error);
            res.status(500).send('Възникна грешка! Моля, опитайте пак.');
        });
};

module.exports.editCollection = function(req, res) {
    const collectionObj = req.body.collection;
    const collectionId = String(req.params.collectionId);
    const newTitle = String(collectionObj.title);
    const newCategory = String(collectionObj.category);
    const newWords = collectionObj.words.map(w => { return String(w) });
    const collection = new Collection(req.decoded.email, collectionId);
    collection
        .update(newTitle, newWords, newCategory)
        .then(function() {
            res.send('Колекцията е променена успешно!');
        }, function(error) {
            console.log(error);
            res.status(500).send('Възникна грешка при редакцията на колекцията!');
        });
};

module.exports.deleteCollection = function(req, res) {
    const collection = new Collection(req.decoded.email, String(req.params.collectionId));
    collection
        .deleteCollection()
        .then(function() {
            res.send('Колекцията изтрита успешно.');
        }, function(error) {
            console.log(error);
            res.status(500).send('Възникна грешка при изтриването на колекцията!');
        });
};

module.exports.createPuzzle = function(req, res) {
    const size = Number(req.body.size);
    const title = String(req.body.title);
    const words = req.body.words.map(w => { return String(w) });
    Puzzle
        .createPuzzle(req.decoded.email, words, size, title)
        .then(function() {
            res.send('Пъзела е създаден успешно.');
        }, function(error) {
            console.log(error);
            res.stauts(500).send('Грешка при създаването на пъзела!');
        });
};

module.exports.deletePuzzle = function(req, res) {
    const puzzleId = req.params.puzzleId;
    const puzzle = new Puzzle(null, req.decoded.email, puzzleId);
    puzzle
        .deletePuzzle()
        .then(function() {
            res.send('Пъзелът изтрит успешно!');
        }, function(error) {
            console.log(error);
            res.status(500).send('Грешка при изтриването на пъзела!');
        });
};

module.exports.getPuzzle = function(req, res) {
    const puzzle = new Puzzle(null, req.decoded.email);
    puzzle
        .getPuzzle()
        .then(function(puzzles) {
            res.send(puzzles);
        }, function(error) {
            console.log(error);
            res.status(500).send('Грешка при изтеглянето! Моля, опитайте пак.');
        });
};

module.exports.getPuzzleSolvers = function(req, res) {
    const puzzleId = req.params.puzzleId;
    const puzzle = new Puzzle(null, req.decoded.email, puzzleId);
    puzzle
        .getPuzzleSolvers()
        .then(function(response) {
            res.send({
                puzzle: response.puzzle,
                solvers: response.solvers
            });
        }, function(error) {
            console.log(error);
            res.status(500).send('Възникна грешка, моля опитайте пак.');
        });
};

module.exports.generatePuzzleCode = function(req, res) {
    const puzzle = new Puzzle(null, req.decoded.email, req.params.puzzleId);
    puzzle
        .generatePuzzleCode()
        .then(function() {
            res.send();
        }, function(error) {
            res.send(error);
        });
}