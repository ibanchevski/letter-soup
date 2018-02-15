const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Controllers
const TeacherController = require('./controllers/Teacher');
const TokenController = require('./controllers/Token');

const app = express();
const router = express.Router();
const config = require('./config');
const PORT = config.PORT || 80;

// Connect to the LOCAL database
mongoose.connect('mongodb://localhost/test', {
    reconnectTries: 5,
    reconnectInterval: 500
}).then(function onDBConnection() {
    console.log('Database connected!');
}, function onDBError(error) {
    // TODO: Proper error logging
    return console.log(error);
});

// Log HTTP requests
app.use(morgan('dev'));

// Parse incoming requests bodies
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Use Express router for routing
app.use(router);

// Serve static files
app.use(express.static('../app'));

router.post('/teacher', TeacherController.registerTeacher);

router.post('/login', TeacherController.login);

router.get('/token/valid', TokenController.validate);
// Start server on given port
app.listen(PORT, function() {
    console.log('Server running on port ' + PORT);
});
