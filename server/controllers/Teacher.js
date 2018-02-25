const Teacher = require('../classes/Teacher');

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
    const parsedCollection = {};
    parsedCollection.title = String(req.body.collection.title);
    parsedCollection.category = String(req.body.collection.category);
    parsedCollection.words = req.body.collection.words.map(function(word) {
        return String(word);
    });
    
    const teacher = new Teacher(req.decoded.email)
    teacher
        .createCollection(parsedCollection)
        .then(function() {
            res.send('Колекцията е създадена успешно!');
        }, function(error) {
            res.status(500).send(error);
        });
};