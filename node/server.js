//Dependencies
var http = require('http');
var fs = require('fs');
const path = require('path');
var express = require('express')

var app = express();

app.use('/imgs', express.static(path.join('../imgs', '../imgs')));
app.use('/css', express.static(path.join("../css", '../css')));
app.use('/js', express.static(path.join("../js", '../js')));
app.use('/fonts', express.static(path.join("../fonts", '../fonts')));

app.get('/', function (req, res) {
  fs.readFile('../docs/index.html', "utf8", function(err, data) {
    sendFile(res, err, data);
  });
});

app.get('/dashboard', function (req, res) {
  fs.readFile('../docs/dashboard.html', "utf8", function(err, data) {
    sendFile(res, err, data);
  });
});

app.get('/envelopes', function (req, res) {
  fs.readFile('../docs/envelopes.html', "utf8", function(err, data) {
    sendFile(res, err, data);
  });
});

app.get('/goals', function (req, res) {
  fs.readFile('../docs/goals.html', "utf8", function(err, data) {
    sendFile(res, err, data);
  });
});

app.get('/bills', function (req, res) {
  fs.readFile('../docs/bills.html', "utf8", function(err, data) {
    sendFile(res, err, data);
  });
});

app.get('/history', function (req, res) {
  fs.readFile('../docs/history.html', "utf8", function(err, data) {
    sendFile(res, err, data);
  });
});

app.get('/utility', function (req, res) {
  fs.readFile('../docs/utility.html', "utf8", function(err, data) {
    sendFile(res, err, data);
  });
});

app.get('/account', function (req, res) {
  fs.readFile('../docs/account.html', "utf8", function(err, data) {
    sendFile(res, err, data);
  });
});

app.listen(8080);

function sendFile(res, err, data) {
  if (err) {
    console.log(err);
    res.sendStatus(404);
    return;
  }
  res.send(data);
}