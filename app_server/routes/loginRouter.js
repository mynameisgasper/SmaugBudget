var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

//Business logic
var index = require('../controllers/index.js');
var confirmation = require('../controllers/confirmation.js');

var jsonParser = bodyParser.json()

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session && req.cookies && req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }    
};

//Index
router.get('/', sessionChecker, (req, res) => {
    index.get(req, res);
});

router.post('/', jsonParser, (req, res) => {
    index.post(req, res);
});

//Email confirmation
router.get('/confirmation/:urlCode', (req, res) => {
    confirmation.get(req, res);
});

//Email confirmation
router.get('/confirmation/:urlCode/:code', (req, res) => {
    confirmation.confirm(req, res);
});

module.exports = router;