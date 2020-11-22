//Dependencies
const path = require('path');
var express = require('express');
var bodyParser = require('body-parser')
var exphbs = require('express-handlebars');
var helpers = require('../views/helpers/hbsh');
const session = require('express-session');

//Business logic
var index = require('../controllers/index.js');
var dashboard = require('../controllers/dashboard.js');
var envelopes = require('../controllers/envelopes.js');
var goals = require('../controllers/goals.js');
var bills = require('../controllers/bills.js');
var history = require('../controllers/history.js');
var utility = require('../controllers/utilities.js');
var account = require('../controllers/account.js');
var confirmation = require('../controllers/confirmation.js');
var notFound404 = require('../controllers/not_found.js');
var pdf = require('../controllers/pdf.js');
const { pbkdf2 } = require('crypto');

var app = express();
var jsonParser = bodyParser.json()

app.use(bodyParser.urlencoded({ extended: true }));

var hbs = exphbs.create({
    helpers: helpers,
    defaultLayout: 'layout',
    extname:'.hbs'
});


//Cookies
app.use(session(
    {
        key: 'user_sid',
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 21600000
        }
    }
));
app.set('trust proxy', 1);
app.use((req, res, next) => {
    if (req.cookies && req.session && req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session && req.cookies && req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }    
};

//Import static files
app.use(express.static('../public'))

//Handlebars
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

//Index
app.get('/', sessionChecker, (req, res) => {
    index.get(req, res);
});

app.post('/', jsonParser, (req, res) => {
    index.post(req, res);
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

//PDF generator
app.post('/pdf', (req, res) => {
    pdf.post(req, res);
});

//Path was not recognized, return 404
app.all('*', (req, res) => {
    notFound404.get(req, res);
});

module.exports = {
    startServer: (port) => {
        app.listen(port, () => console.log("Server started"));
    }
}