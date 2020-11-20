//Dependencies
const path = require('path');
var express = require('express');

//Business logic
var index = require('../services/index.js');
var dashboard = require('../services/dashboard.js');
var envelopes = require('../services/envelopes.js');
var goals = require('../services/goals.js');
var bills = require('../services/bills.js');
var history = require('../services/history.js');
var utility = require('../services/utility.js');
var account = require('../services/account.js');
var confirmation = require('../services/confirmation.js');
var notFound404 = require('../services/not_found.js');

var app = express();

//Import static files
app.use('/imgs', express.static(path.join('../imgs', '../imgs')));
app.use('/css', express.static(path.join("../css", '../css')));
app.use('/js', express.static(path.join("../js", '../js')));
app.use('/fonts', express.static(path.join("../fonts", '../fonts')));

//Index
app.get('/', function (req, res) {
  index.get(req, res);
});

//Dashboard
app.get('/dashboard', function (req, res) {
  dashboard.get(req, res);
});

//Envelopes
app.get('/envelopes', function (req, res) {
  envelopes.get(req, res);
});

//Goals
app.get('/goals', function (req, res) {
  goals.get(req, res);
});

//Bills
app.get('/bills', function (req, res) {
  bills.get(req, res);
});

//History
app.get('/history', function (req, res) {
  history.get(req, res);
});

//Utilities
app.get('/utility', function (req, res) {
  utility.get(req, res);
});

//Account info
app.get('/account', function (req, res) {
  account.get(req, res);
});

//Email confirmation
app.get('/confirmation', function (req, res) {
  confirmation.get(req, res);
});

//Path was not recognized, return 404
app.all('*', function (req, res) {
  notFound404.get(req, res);
});

module.exports = {
    startServer: function(port) {
        console.log("Starting server");
        app.listen(port);
        console.log("Server started");
    }
}