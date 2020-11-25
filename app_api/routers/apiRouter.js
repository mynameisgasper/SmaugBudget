var user = require('../controllers/userController');
var bills = require('../controllers/billsController');
var envelopes = require('../controllers/envelopesController');
var goals = require('../controllers/goalsController');

var converter = require('../controllers/currencyConverter');

converter.currencyConverter();

var express = require('express');
const currencyConverter = require('../controllers/currencyConverter');
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

router.all('/confirm/:urlCode/:code', (req, res) => {
    user.confirm(req, res);
});

router.post('/changeIncome', (req, res) => {
    user.changeIncome(req, res);
});

router.post('/uploadPfp', user.uploadImg , user.postImg);

router.get('/getPfp', (req, res) => {
    user.getPfp(req, res);
});

router.post('/addBill', (req, res) => {
    bills.addBill(req, res);
});

router.post('/addEnvelope', (req, res) => {
    envelopes.addEnvelope(req, res);
})

router.post('/editEnvelope', (req, res) => {
    envelopes.editEnvelope(req, res);
})

router.post('/addExpense', (req, res) => {
    envelopes.addExpense(req, res);
})

router.post('/deleteEnvelope', (req, res) => {
    envelopes.deleteEnvelope(req, res);
})

router.post('/editHistory', (req, res) => {
    history.editHisory(req, res);
})

router.get('/converter', (req, res) => {
    converter.converter(req, res);
})

router.put('/editBill', (req, res) => {
    bills.editBill(req, res);
})

router.delete('/deleteBill', (req, res) => {
    bills.deleteBill(req, res);
})

router.post('/addGoal', (req, res) => {
    goals.addGoal(req, res);
})

module.exports = router;