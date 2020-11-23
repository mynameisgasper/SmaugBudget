var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

//Routers
var loginRouter = require('../routes/loginRouter');
var userRouter = require('../routes/userRouter');

router.use(bodyParser.urlencoded({ extended: true }));

router.use('/', loginRouter);
router.use('/', userRouter);

module.exports = router;