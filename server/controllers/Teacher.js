const Teacher = require('../classes/Teacher');
module.exports.registerTeacher = function(req, res) {
    // Validate input!
    Teacher.register(req.body.teacher)
        .then(function(response) {
            res.send(response);
        }, function(error) {
            // TODO: Handle error
            res.status(500).send(error);
        });
};