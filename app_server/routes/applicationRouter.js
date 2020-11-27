var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

//Routers
var loginRouter = require('../routes/loginRouter');
var userRouter = require('../routes/userRouter');
router.use(bodyParser.urlencoded({ extended: true }));


/* 
? Router for /db
*/

var db = require('../controllers/db.js');

router.get('/db', (req, res) => {
    db.get(req, res);
});

router.post('/db', (req, res) => {
    db.post(req, res);
});


router.use('/', loginRouter);
router.use('/', userRouter);

module.exports = router;