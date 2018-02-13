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
}