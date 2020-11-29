var Client = require('node-rest-client').Client;
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

//Common router
router.all('*', (req, res, next) => {
    refreshSession(req)
    next();
})

//Dashboard
router.get('/dashboard', (req, res) => {
    dashboard.get(req, res);
});

//Envelopes
router.get('/envelopes', (req, res) => {
    envelopes.get(req, res);
});

router.post('/envelopes', (req, res) => {
    envelopes.post(req, res);
});

//Goals
router.get('/goals', (req, res) => {
    goals.get(req, res);
});

router.post('/goals', (req, res) => {
    goals.post(req, res);
});

//Bills
router.get('/bills', (req, res) => {
    bills.get(req, res);
});

router.post('/bills', (req, res) => {
    bills.post(req, res);
});

//History
router.get('/history', (req, res) => {
    if(req.session.user.isPremium == true) {
        history.get(req, res);
    }
    else {
        res.redirect('dashboard#notpremium');
    }
});
router.post('/history', (req, res) => {
    history.post(req, res);
});

//Utilities
router.get('/utility', (req, res) => {
    if(req.session.user.isPremium == true) {
        utility.get(req, res);
    }
    else {
        res.redirect('dashboard#notpremium');
    }
});

router.post('/utility', (req, res) => {
    if(req.session.user.isPremium == true) {
        utility.post(req, res);
    }
    else {
        res.redirect('dashboard#notpremium');
    }
});

//Account info
router.get('/account', (req, res) => {
    account.get(req, res);
});
router.post('/account', (req, res) => {
    account.post(req, res);
});

//PDF generator
router.post('/pdf', (req, res) => {
    pdf.post(req, res);
});

function refreshSession(req) {
    if (req.session.user) {
        const data = {
            id: req.session.user._id,
        }
    
        var args = {
            data: data,
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        };
    
    
        var client = new Client();
        client.post("http://" + req.headers.host + "/api/getUser", args, function(data, response) {
            if (response.statusCode == 200) {
                req.session.user = data;
            } else {
            }
        });
    }
}

module.exports = router;