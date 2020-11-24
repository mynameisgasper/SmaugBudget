var express = require('express');
var router = express.Router();

//Business logic
var dashboard = require('../controllers/dashboard.js');
var envelopes = require('../controllers/envelopes.js');
var goals = require('../controllers/goals.js');
var bills = require('../controllers/bills.js');
var history = require('../controllers/history.js');
var utility = require('../controllers/utilities.js');
var account = require('../controllers/account.js');
var pdf = require('../controllers/pdf.js');

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
router.post('/account', (req, res) => {
    account.get(req, res);
});

//PDF generator
router.post('/pdf', (req, res) => {
    pdf.post(req, res);
});

module.exports = router;