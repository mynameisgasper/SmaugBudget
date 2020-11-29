//Dependencies
//First requirement is database
require('./app_api/models/db');
const path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var helpers = require('./app_server/views/helpers/hbsh');
const session = require('express-session');
var app = express();

//Currencies
var currencies = [];

//Business logic
var notFound404 = require('./app_server/controllers/not_found.js');

//Helpers
require('./app_server/views/helpers/hbsh.js');

//Routers
var applicationRouter = require('./app_server/routes/applicationRouter');
var apiRouter = require('./app_api/routers/apiRouter');

//Handlebars
var hbs = exphbs.create({
    helpers: helpers,
    defaultLayout: 'layout',
    extname: '.hbs'
});
app.set('views', path.join('./app_server/views'));
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

//Cookies
app.use(session({
    key: 'user_sid',
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 21600000
    }
}));
app.set('trust proxy', 1);
app.use((req, res, next) => {
    if (req.cookies && req.session && req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});

//Import static files
app.use(express.static('./public'))

app.use('/', applicationRouter);
app.use('/api', apiRouter);

//Path was not recognized, return 404
app.all('*', (req, res) => {
    notFound404.get(req, res);
});

module.exports = {
    startServer: (port) => {
        app.listen(port, () => console.log("Server started"));
    },
    currencies: currencies
}