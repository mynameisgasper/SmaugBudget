var Scheduler = require('cron').CronJob;
const mongoose = require('mongoose');
const Categories = mongoose.model('Categories');
var bills = require('./billsController');
var users = require('./userController');

//Startup jobs
var converter = require('../controllers/currencyConverter');
converter.currencyConverter();

initializeDatabase();

var periodicCurrencyUpdate = new Scheduler('0 0 * * * *', function() {
    converter.currencyConverter();
    console.log('Currencies updated');
}, null, true, 'Europe/Ljubljana');
periodicCurrencyUpdate.start();

var billsUpdate = new Scheduler('0 59 23 * * *', function() {
    handleBills();
    console.log('Bills updated');
}, null, true, 'Europe/Ljubljana');
billsUpdate.start();

var paycheckUpdate = new Scheduler('0 59 23 * * *', function() {
    handlePaychecks();
    console.log('Bills updated');
}, null, true, 'Europe/Ljubljana');
paycheckUpdate.start();

function initializeDatabase() {
    categoriesSeeder();
    handleBills();
    handlePaychecks();
}

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
    categories[7] = { name: 'Shopping', color: 'rgb(48, 191, 98)' };
    categories[8] = { name: 'Utilities', color: 'rgb(81, 219, 237)' };
    categories[9] = { name: 'Electronics', color: 'rgb(28, 214, 40)' };

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

async function handleBills() {
    bills.handleBills();
}

async function handlePaychecks() {
    users.handlePaychecks();
}