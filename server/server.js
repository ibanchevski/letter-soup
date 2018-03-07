// Modules
const express     = require('express');
const morgan      = require('morgan');
const bodyParser  = require('body-parser');
const mongoose    = require('mongoose');
const jwt         = require('jsonwebtoken');

// Controllers
const TeacherController = require('./controllers/Teacher');
const TokenController   = require('./controllers/Token');
const PuzzleController  = require('./controllers/Puzzle');
const cookiesParser     = require('./modules/CookiesParser');
const UserController    = require('./controllers/User');

// Config vars
const app    = express();
const router = express.Router();
const config = require('./config');
const PORT   = config.PORT || 80;

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

// Serve static files
// TODO: Probably remove 
// (serve with web server and use different port (3000?))
app.use(express.static('../app'));

// Log HTTP requests
app.use(morgan('dev'));

// Parse incoming requests bodies
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// ============ UNAUTHORISED ROUTES ============== //

router.post('/teacher', TeacherController.registerTeacher);

router.post('/login', TeacherController.login);

router.get('/token/valid', TokenController.validate);

router.get('/puzzle/:puzzleCode/valid', PuzzleController.validatePuzzleToken);

router.post('/user', UserController.createTempUser);
router.get('/user/puzzle/:puzzleCode', UserController.getPuzzle);


// ============ AUTHENTICATION-REQUIRED ROUTES ============== //
// Validate token on every request and save the decoded info (email) in the req object
// TODO: Probably move to a module
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
            res.status(401).send('Грешка при ауторизацията! Моля, влезте в профила отново.');
            return;
        }
        req.decoded = decoded;
        next();
    });
});

router.get('/collection/:collectionId?', TeacherController.getCollection);
router.post('/collection', TeacherController.createCollection);
router.put('/collection/:collectionId', TeacherController.editCollection);
router.delete('/collection/:collectionId', TeacherController.deleteCollection);

router.post('/puzzle', TeacherController.createPuzzle);
router.get('/puzzle', TeacherController.getPuzzle);

// Use Express router for routing
app.use('/api', router);

// Start server on given port
app.listen(PORT, function() {
    console.log('Server running on port ' + PORT);
});
