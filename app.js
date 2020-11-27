//Dependencies
require('./app_api/models/db');
const path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var helpers = require('./app_server/views/helpers/hbsh');
const session = require('express-session');
var app = express();
const mongoose = require('mongoose');
const Categories = mongoose.model('Categories');


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

//Add Basic Categories
async function categoriesSeeder() {
    var categories = [];
    categories[0] = { name: 'Car', color: 'rgb(50, 168, 156)' };
    categories[1] = { name: 'Groceries', color: 'rgb(232, 176, 23)' };
    categories[2] = { name: 'Leisure', color: 'rgb(191, 33, 194)' };
    categories[3] = { name: 'Subscriptions', color: 'rgb(209, 23, 104)' };
    categories[4] = { name: 'Travel', color: 'rgb(88, 52, 179)' };
    categories[5] = { name: 'Home', color: 'rgb(173, 209, 52)' };
    categories[6] = { name: 'Gifts', color: 'rgb(50, 168, 82)' };
    categories[7] = { name: 'Shopping', color: 'rgb(233, 125, 245)' };
    categories[8] = { name: 'Utilities', color: 'rgb(81, 219, 237)' };

    let promise = new Promise(function(res, err) {
        var bool = true;
        Categories.find({ 'basic': 'true' }, function(error, categories) {
            if (error) {
                console.log(error);
            } else {
                if (categories.length > 0) {
                    bool = false;

                }
            }
            res(bool);
        });
    });

    promise.then(function(bool) {
        if (bool) {
            for (var i = 0; i < categories.length; i++) {
                let new_category = new Categories({
                    name: categories[i].name,
                    color: categories[i].color,
                    basic: true
                });
                new_category.save();
            }
        }
    });




}




module.exports = {
    startServer: (port) => {
        categoriesSeeder();
        app.listen(port, () => console.log("Server started"));
    }
}