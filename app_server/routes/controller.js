//Dependencies
const path = require('path');
var express = require('express');
var bodyParser = require('body-parser')
var exphbs = require('express-handlebars');

//Business logic
var index = require('../controllers/index.js');
var dashboard = require('../controllers/dashboard.js');
var envelopes = require('../controllers/envelopes.js');
var goals = require('../controllers/goals.js');
var bills = require('../controllers/bills.js');
var history = require('../controllers/history.js');
var utility = require('../controllers/utility.js');
var account = require('../controllers/account.js');
var confirmation = require('../controllers/confirmation.js');
var notFound404 = require('../controllers/not_found.js');

var app = express();
var jsonParser = bodyParser.json()

//Import static files
app.use('/images', express.static(path.join('../images', '../imgs')));
app.use('/stylesheets', express.static(path.join("../stylesheets", '../css')));
app.use('/javascripts', express.static(path.join("../javascripts", '../js')));
app.use('/webfonts', express.static(path.join("../webfonts", '../fonts')));


app.engine('hbs', exphbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));

app.set('view engine', 'hbs');


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
    res.render('goals', {
        goal: [{
                title: 'iPhone',
                progress: 100,
                target: 1200,
                targetLeft: 0
            },
            {
                title: 'Ferrari F8 Tributo',
                progress: 69,
                target: 100000,
                targetLeft: 100000
            }
        ]
    });
});

//Bills
app.get('/bills', (req, res) => {
    //bills.get(req, res);
    res.render('bills');
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