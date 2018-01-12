const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();
const config = require('./config');
const PORT = config.PORT || 80;

// Log HTTP requests
app.use(morgan('dev'));
// Parse incoming requests bodies
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// Use Express router for routing
app.use(router);

// Server static files
app.use(express.static('../app'));

// Start server on given port
app.listen(PORT, function() {
    console.log('Server running on port ' + PORT);
});
