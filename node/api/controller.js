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
var notFound404 = require('../services/not_found.js');

var app = express();

//Import static files
app.use('/imgs', express.static(path.join('../imgs', '../imgs')));
app.use('/css', express.static(path.join("../css", '../css')));
app.use('/js', express.static(path.join("../js", '../js')));
app.use('/fonts', express.static(path.join("../fonts", '../fonts')));

app.get('/', function (req, res) {
  index.get(req, res);
});

app.get('/dashboard', function (req, res) {
  dashboard.get(req, res);
});

app.get('/envelopes', function (req, res) {
  envelopes.get(req, res);
});

app.get('/goals', function (req, res) {
  goals.get(req, res);
});

app.get('/bills', function (req, res) {
  bills.get(req, res);
});

app.get('/history', function (req, res) {
  history.get(req, res);
});history

app.get('/utility', function (req, res) {
  utility.get(req, res);
});

app.get('/account', function (req, res) {
  account.get(req, res);
});

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