var user = require('../controllers/userController');
var bills = require('../controllers/billsController');
var envelopes = require('../controllers/envelopesController');
var goals = require('../controllers/goalsController');
var history = require('../controllers/expenseController');
var dbController = require('../controllers/dbController');
var connections = require('../controllers/connectionsController');
var categories = require('../controllers/categoryController');
var friendGroup = require('../controllers/friendGroupController');

var express = require('express');
const converter = require('../controllers/currencyConverter');
const db = require('../../app_server/controllers/db');
const { connection } = require('mongoose');
var router = express.Router();

//Index
router.all('/', (req, res) => {
    res.sendStatus(404);
});

router.post('/register', (req, res) => {
    user.register(req, res);
});

router.post('/login', (req, res) => {
    user.login(req, res);
});

router.post('/requestResetPassword', (req, res) => {
    user.requestResetPassword(req, res);
});

router.post('/resetPassword', (req, res) => {
    user.resetPassword(req, res);
});

router.post('/changePassword', (req, res) => {
    user.changePassword(req, res);
});

router.post('/getUser/', (req, res) => {
    user.retrieveUser(req, res);
});

router.post('/getUserEmail/', (req, res) => {
    user.retrieveUserEmail(req, res);
});

router.all('/confirm/:urlCode/:code', (req, res) => {
    user.confirm(req, res);
});

router.post('/changeIncome', (req, res) => {
    user.changeIncome(req, res);
});

router.post('/uploadPfp', user.uploadImg, user.postImg);

router.get('/getPfp', (req, res) => {
    user.getPfp(req, res);
});

router.post('/updateUser', (req, res) => {
    user.updateUser(req, res);
});

router.post('/setCurrency', (req, res) => {
    user.setCurrency(req, res);
})

router.post('/addBill', (req, res) => {
    bills.addBill(req, res);
});

router.post('/addEnvelope', (req, res) => {
    envelopes.addEnvelope(req, res);
});

router.post('/editEnvelope', (req, res) => {
    envelopes.editEnvelope(req, res);
});

router.post('/addExpense', (req, res) => {
    envelopes.addExpense(req, res);
});

router.post('/getLastMonthExpenses', (req, res) => {
    history.getLastMonthExpenses(req, res);
});

router.post('/deleteEnvelope', (req, res) => {
    envelopes.deleteEnvelope(req, res);
});

router.post('/editExpense', (req, res) => {
    history.editExpense(req, res);
});

router.get('/converter', (req, res) => {
    converter.converter(req, res);
});

router.post('/editBill', (req, res) => {
    bills.editBill(req, res);
});

router.post('/deleteBill', (req, res) => {
    bills.deleteBill(req, res);
});

router.post('/addGoal', (req, res) => {
    goals.addGoal(req, res);
});

router.post('/editGoal', (req, res) => {
    goals.editGoal(req, res);
});

router.post('/addToGoalWithCategory', (req, res) => {
    goals.addToGoalWithCategory(req, res);
});

router.post('/deleteGoal', (req, res) => {
    goals.deleteGoal(req, res);
});


router.post('/removeAllDbData', (req, res) => {
    dbController.removeAllDbData(req, res);
});

router.get('/getNewUsers', (req, res) => {
    connections.getNewUsers(req, res);
});

router.get('/getUserConnections', (req, res) => {
    connections.getUserConnections(req, res);
});

router.post('/addConnection', (req, res) => {
    connections.addConnection(req, res);
});

router.get('/getEnvelopesForDropdown', (req, res) => {
    connections.getEnvelopesForDropdown(req, res);
});

router.post('/createDummyAccounts', (req, res) => {
    dbController.createDummyAccounts(req, res);
});

router.post('/loadCategories', (req, res) => {
    dbController.loadCategories(req, res);
});

router.post('/changeColorCategory', (req, res) => {
    categories.changeColorCategory(req, res);
})

router.post('/deleteCategory', (req, res) => {
    categories.deleteCategory(req, res);
});

router.post('/toggleVisible', (req, res) => {
    connections.toggleVisible(req, res);
})

router.post('/addFriendGroup', (req, res) => {
    friendGroup.addFriendGroup(req, res);
})

router.post('/calculateBalances', (req, res) => {
    friendGroup.calculateBalances(req, res);
})

router.post('/deleteFriendGroup', (req, res) => {
    friendGroup.deleteFriendGroup(req, res);
})

module.exports = router;