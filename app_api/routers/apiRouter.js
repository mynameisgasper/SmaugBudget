var express = require('express');
var router = express.Router();

//Index
router.get('/', (req, res) => {
    res.send(200);
});


module.exports = router;