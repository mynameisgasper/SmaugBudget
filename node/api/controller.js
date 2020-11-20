//Dependencies
const path = require('path');
var express = require('express');
var bodyParser = require('body-parser')

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
var jsonParser = bodyParser.json()

//Import static files
app.use('/imgs', express.static(path.join('../imgs', '../imgs')));
app.use('/css', express.static(path.join("../css", '../css')));
app.use('/js', express.static(path.join("../js", '../js')));
app.use('/fonts', express.static(path.join("../fonts", '../fonts')));

//Index
app.get('/', (req, res) => {
  index.get(req, res);
});

app.post('/', jsonParser, (req, res) => {
  console.log(req.body);
  res.send(200);
});

//Dashboard
app.get('/dashboard', (req, res) => {
  dashboard.get(req, res);
});

//Envelopes
app.get('/envelopes', (req, res) => {
  envelopes.get(req, res);
});

//Goals
app.get('/goals', (req, res) => {
  goals.get(req, res);
});

//Bills
app.get('/bills', (req, res) => {
  bills.get(req, res);
});

//History
app.get('/history', (req, res) => {
  history.get(req, res);
});

//Utilities
app.get('/utility', (req, res) => {
  utility.get(req, res);
});

//Account info
app.get('/account', (req, res) => {
  account.get(req, res);
});

//Email confirmation
app.get('/confirmation', (req, res) => {
  confirmation.get(req, res);
});

//Path was not recognized, return 404
app.all('*', (req, res) => {
  notFound404.get(req, res);
});

module.exports = {
    startServer: (port) => {
        app.use(bodyParser.json());
        app.listen(port, () => console.log("Server started"));
    }
}