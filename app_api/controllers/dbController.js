const mongoose = require('mongoose');
const envelopes = require('../../app_server/controllers/envelopes');
const Bills = mongoose.model('Bills');
const Categories = mongoose.model('Categories');
const Envelopes = mongoose.model('Envelopes');
const Expenses = mongoose.model('Expense');
const Goals = mongoose.model('Goals');
const User = mongoose.model('User');
const FriendGroup = mongoose.model('FriendGroup');
const Friend = mongoose.model('Friend');
//const Connections = mongoose.model('Connections');
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

        Friend.deleteMany({}).then(function() {
            console.log("Deleted all friend data");
        }).catch(function(error) {
            console.log(error);
            res.sendStatus(500);
        });

        FriendGroup.deleteMany({}).then(function() {
            console.log("Deleted all friend groups data");
        }).catch(function(error) {
            console.log(error);
            res.sendStatus(500);
        });
/*
        Connections.deleteMany({}).then(function() {
            console.log("Deleted all connections data");
        }).catch(function(error) {
            console.log(error);
            res.sendStatus(500);
        })
*/


        res.status(204).json();
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
        var friendsArray = [];
        var friendGroupsArray = [];
        //var connectionArray = [];

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

        for (var i = 0; i < podatki.friends.length; i++) {
            let friend = new Friend({
                name: podatki.friends[i].name,
                balance: podatki.friends[i].balance,
            });
            friendsArray[i] = friend;
            friend.save();
        }

        for (var i = 0; i < podatki.friendgroups.length; i++) {
            let friendGroup = new FriendGroup({
                name: podatki.friendgroups[0].name,
                balance: podatki.friendgroups[0].balance,
                friends: podatki.friendgroups[0].friends,
            });
            friendGroupsArray[i] = friendGroup;
            friendGroup.save();
        }
        /*
        for (var i = 0; i < podatki.connections.length; i++) {
            let connection = new Connections({
                name: podatki.connections[i].name,
                guestName: podatki.connections[i].guestName,
                active: podatki.connections[i].active,
                user: podatki.connections[i].user,
                hostUser: podatki.connections[i].hostUser,
                envelopes: podatki.connections[i].envelopes    
            });
            connectionArray[i] = connection;
            connection.save();
        }
*/
        let userBronze = new User({
            firstname: "Bronze",
            lastname: "User",
            email: "bronze@smaug.com",
            password: "$2a$10$3fD2JXL3.y45.XZyOCGZP.DhUIosphXrYOdWCZApERT.rtP.G3X6W",
            passwordSalt: "$2a$10$3fD2JXL3.y45.XZyOCGZP.",
            paycheck: 1100,
            paycheckLastMonth: 1500,
            paycheckDate: 18,
            accessLevel: 0,
            language: "English",
            categories: categoriesArray,
            envelopes: envelopesArray,
            expense: expensesArray,
            bills: billsArray,
            goals: goalsArray,
            friendgroups: friendGroupsArray
            //connections: connectionArray
        });
        let userSilver = new User({
            firstname: "Silver",
            lastname: "User",
            email: "silver@smaug.com",
            password: "$2a$10$l/8Qmu7hqkGrmdJf1oEmLenyP11lB5P6/YV27DBYI6Qjj/4mX/F3m",
            passwordSalt: "$2a$10$l/8Qmu7hqkGrmdJf1oEmLe",
            paycheck: 1100,
            paycheckLastMonth: 1500,
            paycheckDate: 18,
            accessLevel: 1,
            language: "English",
            categories: categoriesArray,
            envelopes: envelopesArray,
            expense: expensesArray,
            bills: billsArray,
            goals: goalsArray,
            friendgroups: friendGroupsArray
            //connections: connectionArray
        });
        let userGold = new User({
            firstname: "Gold",
            lastname: "User",
            email: "gold@smaug.com",
            password: "$2a$10$wB/vyQL5sOFvfqSb.012I.lgopnxXB1RTLAExqoAt.4FOcmXR0lUG",
            passwordSalt: "$2a$10$wB/vyQL5sOFvfqSb.012I.",
            paycheck: 1500,
            paycheckLastMonth: 1500,
            paycheckDate: 18,
            accessLevel: 2,
            language: "English",
            categories: categoriesArray,
            envelopes: envelopesArray,
            expense: expensesArray,
            bills: billsArray,
            goals: goalsArray,
            friendgroups: friendGroupsArray
            //connections: connectionArray

        });
        userBronze.save();
        userSilver.save();
        userGold.save();
        res.status(200).json();
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
        } else{
            res.sendStatus(304);
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