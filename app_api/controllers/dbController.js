const mongoose = require('mongoose');
const envelopes = require('../../app_server/controllers/envelopes');
const Bills = mongoose.model('Bills');
const Categories = mongoose.model('Categories');
const Envelopes = mongoose.model('Envelopes');
const Expenses = mongoose.model('Expense');
const Goals = mongoose.model('Goals');
const User = mongoose.model('User');
const podatki = require('../models/testni-podatki.json');
/*
? Remove all data currently in DB
*/

function removeAllDbData(requestBody, res) {
    try {
        Envelopes.deleteMany({}).then(function() {
            console.log("Deleted all envelope data");
        }).catch(function(error) {
            console.log(error);
            res.sendStatus(500);
        });

        Expenses.deleteMany({}).then(function() {
            console.log("Deleted all expense data");
        }).catch(function(error) {
            console.log(error);
            res.sendStatus(500);
        });

        Bills.deleteMany({}).then(function() {
            console.log("Deleted all bill data");
        }).catch(function(error) {
            console.log(error);
            res.sendStatus(500);
        });

        Categories.deleteMany({}).then(function() {
            console.log("Deleted all category data");
        }).catch(function(error) {
            console.log(error);
            res.sendStatus(500);

        });

        Goals.deleteMany({}).then(function() {
            console.log("Deleted all goal data");
        }).catch(function(error) {
            console.log(error);
            res.sendStatus(500);
        });

        User.deleteMany({}).then(function() {
            console.log("Deleted all user data");
        }).catch(function(error) {
            console.log(error);
            res.sendStatus(500);
        });

        res.sendStatus(204);
    } catch (ex) {
        console.log(ex);
        res.sendStatus(500);
    }
}

function createDummyAccounts(requestBody, res) {
    try {
        var envelopesArray = [];
        var categoriesArray = [];
        var expensesArray = [];
        var billsArray = [];
        var goalsArray = [];

        for (var i = 0; i < podatki.categories.length; i++) {
            let category = new Categories({
                color: podatki.categories[i].color,
                basic: podatki.categories[i].basic,
                name: podatki.categories[i].name
            });
            categoriesArray[i] = category;
            category.save();
        }
        var j = 0;
        for (var i = 0; i < podatki.envelopes.length; i++) {
            let envelope = new Envelopes({
                progress: podatki.envelopes[i].progress,
                budget: podatki.envelopes[i].budget,
                spent: podatki.envelopes[i].spent,
                colorHex: podatki.envelopes[i].colorHex,
                color: podatki.envelopes[i].color,
                bgColor: podatki.envelopes[i].bgColor,
                month: podatki.envelopes[i].month,
                category: podatki.envelopes[i].category,
            });
            envelopesArray[i] = envelope;
            envelope.save();
        }

        for (var i = 0; i < podatki.expenses.length; i++) {
            let expense = new Expenses({
                date: podatki.expenses[i].date,
                category: podatki.expenses[i].category,
                recipient: podatki.expenses[i].recipient,
                value: podatki.expenses[i].value,
                currency: podatki.expenses[i].currency,
            });
            expensesArray[i] = expense;
            expense.save();
        }

        for (var i = 0; i < podatki.goals.length; i++) {
            let goal = new Goals({
                title: podatki.goals[i].title,
                target: podatki.goals[i].target,
                saved: podatki.goals[i].saved,
                date: podatki.goals[i].date,
                monthlyTarget: podatki.goals[i].monthlyTarget,
                category: podatki.goals[i].category,
            });
            goalsArray[i] = goal;
            goal.save();
        }

        for (var i = 0; i < podatki.bills.length; i++) {
            let bill = new Bills({
                recipient: podatki.bills[i].recipient,
                value: podatki.bills[i].value,
                category: podatki.bills[i].category,
                date: podatki.bills[i].date,
                currency: podatki.bills[i].currency,
                repeating: podatki.bills[i].repeating,
            })
            billsArray[i] = bill;
            bill.save();
        }

        let user = new User({
            firstname: "Basic",
            lastname: "User",
            email: "basic@smaug.com",
            password: "fef39973b671dcfc50b3318d3d8c911ad34672a2482f7b331b8099c1af8b9279bb2bde1708551f52e9356b573e4923194895cd77d7557996df758599b94b721c",
            passwordSalt: "tempSalt",
            paycheck: 1100,
            paycheckLastMonth: 1500,
            paycheckDate: 18,
            isPremium: false,
            language: "English",
            categories: categoriesArray,
            envelopes: envelopesArray,
            expense: expensesArray,
            bills: billsArray,
            goals: goalsArray
        });
        let userPremium = new User({
            firstname: "Premium",
            lastname: "User",
            email: "premium@smaug.com",
            password: "7079675d6a49115d18d5f00b1a9be5ae73d0225f5ee8100807e4248846ee50803c130536ce8fc3223b0a22af390b67a013589bdc9e95ac0990ce6eac83de3526",
            passwordSalt: "tempSalt",
            paycheck: 1500,
            paycheckLastMonth: 1500,
            paycheckDate: 18,
            isPremium: true,
            language: "English",
            categories: categoriesArray,
            envelopes: envelopesArray,
            expense: expensesArray,
            bills: billsArray,
            goals: goalsArray

        });
        user.save();
        userPremium.save();
        res.sendStatus(200);
    } catch (ex) {
        console.log(ex);
    }
}


//Add Basic Categories
async function loadCategories(requestBody, res) {
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



    let promise = new Promise(function(resolved, err) {
        var bool = true;
        Categories.find({ 'basic': 'true' }, function(error, categories) {
            if (error) {
                console.log(error);
            } else {
                if (categories.length > 0) {
                    bool = false;
                }
            }
            resolved(bool);
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
            res.sendStatus(200);

        }
    });

}


module.exports = {
    removeAllDbData: function(req, res) {
        removeAllDbData(req.body, res);
    },
    createDummyAccounts: function(req, res) {
        createDummyAccounts(req.body, res);
    },
    loadCategories: function(req, res) {
        loadCategories(req.body, res);
    }
}