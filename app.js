//Dependencies
//First requirement is database
require('./app_api/models/db');
const path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var helpers = require('./app_server/views/helpers/hbsh');
const session = require('express-session');
require('dotenv').config();
var passport = require('passport');
require('./app_api/config/passport');
var swaggerJsdoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');

var swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "SmaugBudget",
        version: "1.0.0",
        description: "SmaugBudget REST API"
      },
      license: {
        name: "GNU LGPLv3",
        url: "https://choosealicense.com/licenses/lgpl-3.0"
      },
      contact: {
        name: "Gasper Stepec"
      },
      servers: [
        { url: "http://localhost:8080/api" },
        { url: "https://smaugbudget.herokuapp.com/api" }
      ]
    },
    apis: [
      "./app_api/models/bills.js",
      "./app_api/models/categories.js",
      "./app_api/models/currency.js",
      "./app_api/models/envelopes.js",
      "./app_api/models/expense.js",
      "./app_api/models/friend.js",
      "./app_api/models/friendGroup.js",
      "./app_api/models/goals.js",
      "./app_api/models/user.js",
      "./app_api/controllers/billsController.js",
      "./app_api/controllers/categoryController.js",
      "./app_api/controllers/currencyController.js",
      "./app_api/controllers/dbController.js",
      "./app_api/controllers/evelopesController.js",
      "./app_api/controllers/expenseController.js",
      "./app_api/controllers/friendGroupController.js",
      "./app_api/controllers/goalsController.js",
      "./app_api/controllers/userController.js"
    ]
  };
  const swaggerDocument = swaggerJsdoc(swaggerOptions);

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
app.use(express.static(path.join(__dirname, 'app_public', 'build')));
app.use(passport.initialize());

app.use('/api', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});
  

app.use('/api', apiRouter);

//Path was not recognized, return 404
app.all('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'app_public', 'build', 'index.html'));
});

//OpenAPI

apiRouter.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
apiRouter.get("/swagger.json", (req, res) => {
  res.status(200).json(swaggerDocument);
});

module.exports = {
    startServer: (port) => {
        app.listen(port, () => console.log("Server started"));
    },
    currencies: currencies
}