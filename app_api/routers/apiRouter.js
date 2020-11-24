var user = require('../controllers/userController');

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
module.exports = router;