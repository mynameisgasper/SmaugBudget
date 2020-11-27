const mongoose = require('mongoose');
const envelopes = require('../../app_server/controllers/envelopes');
const Bills = mongoose.model('Bills');
const Categories = mongoose.model('Categories');
const Envelopes = mongoose.model('Envelopes');
const Expense = mongoose.model('Expense');
const Goals = mongoose.model('Goals');
const User = mongoose.model('User');

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

        Expense.deleteMany({}).then(function() {
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



module.exports = {
    removeAllDbData: function(req, res) {
        removeAllDbData(req.body, res);
    }
}