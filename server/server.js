const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Controllers
const TeacherController = require('./controllers/Teacher');
const TokenController = require('./controllers/Token');
const cookiesParser = require('./modules/CookiesParser');

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

// Serve static files
app.use(express.static('../app'));

app.post('/teacher', TeacherController.registerTeacher);

app.post('/login', TeacherController.login);

router.get('/token/valid', TokenController.validate);

// Validate token on every request and savethe decoded info (email) in the req object
router.use(function (req, res, next) {
    const cookies = cookiesParser.parseCookies(req.headers.cookie);
    
    if (cookies === null) {
        res.status(401).send('Грешка при ауторизацията! Моля, влезте в профила отново.');
        return;
    }

    const token = cookies.find(function(cookie) {
        return cookie.name === '_t';
    });

    if (token === undefined) {
        res.status(401).send('Грешка при ауторизацията! Моля, влезте в профила отново.');
        return;
    }

    jwt.verify(token.value, config.tokenSecret, function (error, decoded) {
        if (error) {
            console.log(error);
            res.status(401).send('Грешка при ауторизацията! Моля, влезте в профила отново.');
            return;
        }
        req.decoded = decoded;
        console.log(decoded);
    });
    next();
});

router.post('/collection', TeacherController.createCollection);

// Use Express router for routing
app.use('/api', router);

// Start server on given port
app.listen(PORT, function() {
    console.log('Server running on port ' + PORT);
});
