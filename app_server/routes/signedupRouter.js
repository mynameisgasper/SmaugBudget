var express = require('express');
var router = express.Router();
const session = require('express-session');
var bodyParser = require('body-parser')

var index = require('../controllers/index.js');
var confirmation = require('../controllers/confirmation.js');
var dashboard = require('../controllers/dashboard.js');
var envelopes = require('../controllers/envelopes.js');
var goals = require('../controllers/goals.js');
var bills = require('../controllers/bills.js');
var history = require('../controllers/history.js');
var utility = require('../controllers/utilities.js');
var account = require('../controllers/account.js');
var pdf = require('../controllers/pdf.js');

var jsonParser = bodyParser.json()
router.use(bodyParser.urlencoded({ extended: true }));

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

//Dashboard
router.get('/dashboard', (req, res) => {
    dashboard.get(req, res);
});

//Envelopes
router.get('/envelopes', (req, res) => {
    envelopes.get(req, res);
});

//Goals
router.get('/goals', (req, res) => {
    goals.get(req, res);
});

//Bills
router.get('/bills', (req, res) => {
    bills.get(req, res);
});

//History
router.get('/history', (req, res) => {
    history.get(req, res);
});

//Utilities
router.get('/utility', (req, res) => {
    utility.get(req, res);
});

//Account info
router.get('/account', (req, res) => {
    account.get(req, res);
});

//PDF generator
router.post('/pdf', (req, res) => {
    pdf.post(req, res);
});

//Email confirmation
router.get('/confirmation', (req, res) => {
    confirmation.get(req, res);
});

module.exports = router;