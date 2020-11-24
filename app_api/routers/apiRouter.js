var user = require('../controllers/userController');
var bills = require('../controllers/billsController');

var express = require('express');
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

router.post('/dashboard#modal', (req, res) => {
    user.changeIncome(req,res);
});

router.post('/addBill', (req, res) => {
    bills.addBill(req, res);
});

module.exports = router;