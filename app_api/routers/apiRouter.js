var user = require('../controllers/userController');
var bills = require('../controllers/billsController');
var envelopes = require('../controllers/envelopesController');
var goals = require('../controllers/goalsController');
var history = require('../controllers/expenseController');
var dbController = require('../controllers/dbController');
//var connections = require('../futureStuff/connectionsController');
var categories = require('../controllers/categoryController');
var friendGroup = require('../controllers/friendGroupController');
const jwt = require('express-jwt');

var express = require('express');
const converter = require('../controllers/currencyConverter');

var router = express.Router();
router.use(express.json());

const authentication = jwt({
    secret: process.env.JWT_PASS || 'jwtsigntoken1!',
    userProperty: 'payload',
    algorithms: ['HS256']
  });

/**
 * Kategorije dostopnih točk
 * @swagger
 * tags:
 *  - name: Uporabnik
 *    description: Obvladovanje podatkov uporabnika
 *  - name: Avtentikacija
 *    description: Obvladovanje uporabnikov
 *  - name: Glavne funkcionalnosti
 *    description: Obvladovanje podatkov uporabnika pri glavnih funkcionalnostih
 */

/**
 * Varnostna shema dostopa
 * @swagger
 * components:
 *  securitySchemes:
 *   jwt:
 *    type: http
 *    scheme: bearer
 *    in: header
 *    bearerFormat: JWT
 */

 
  

router.all('/', (req, res) => {
    res.sendStatus(404);
});

/**
 * @swagger
 *   /registracija:
 *     post:
 *       summary: Registracija novega uporabnika
 *       description: Registracija **novega uporabnika** s podatki o imenu, elektronskem naslovu in geslu.
 *       tags: [Avtentikacija]
 *       requestBody:
 *         description: Podatki za registracijo
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: "#/components/schemas/UserRegistration"
 *       responses:
 *         "200":
 *           description: Uspešna registracija uporabnika z JWT žetonom v rezultatu.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/AuthenticationAnswer"
 *         "400":
 *           description: Napaka zahteve, pri registraciji so obvezni ime, elektronski naslov in geslo.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Error"
 *             example:
 *               sporočilo: Zahtevani so vsi podatki.
 *         "500":
 *           description: Napaka na strežniku pri registraciji uporabnika.
 */

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

router.post('/changePassword', authentication, (req, res) => {
    user.changePassword(req, res);
});

router.get('/getUser', authentication, (req, res) => {
    user.retrieveUser(req, res);
});

router.post('/getUserEmail/', authentication, (req, res) => {
    user.retrieveUserEmail(req, res);
});

router.all('/confirm/:urlCode/:code', (req, res) => {
    user.confirm(req, res);
});

router.post('/changeIncome', authentication, (req, res) => {
    user.changeIncome(req, res);
});

router.post('/uploadPfp', authentication, user.uploadImg, user.postImg);

router.get('/getPfp', authentication, (req, res) => {
    user.getPfp(req, res);
});

router.post('/updateUser', authentication, (req, res) => {
    user.updateUser(req, res);
});

router.post('/setCurrency', authentication, (req, res) => {
    user.setCurrency(req, res);
})

router.post('/addBill', authentication, (req, res) => {
    bills.addBill(req, res);
});

router.post('/addEnvelope', authentication, (req, res) => {
    envelopes.addEnvelope(req, res);
});

router.post('/editEnvelope', authentication, (req, res) => {
    envelopes.editEnvelope(req, res);
});

router.post('/addExpense', authentication, (req, res) => {
    envelopes.addExpense(req, res);
});

router.get('/getExpenses', authentication, (req, res) => {
    history.getExpenses(req, res);
});

router.post('/getLastMonthExpenses', authentication, (req, res) => {
    history.getLastMonthExpenses(req, res);
});

router.post('/deleteEnvelope', authentication, (req, res) => {
    envelopes.deleteEnvelope(req, res);
});

router.post('/editExpense', authentication, (req, res) => {
    history.editExpense(req, res);
});

router.get('/converter', authentication, (req, res) => {
    converter.converter(req, res);
});

router.post('/editBill', authentication, (req, res) => {
    bills.editBill(req, res);
});

router.post('/deleteBill', authentication, (req, res) => {
    bills.deleteBill(req, res);
});

router.post('/addGoal', authentication, (req, res) => {
    goals.addGoal(req, res);
});

router.post('/editGoal', authentication, (req, res) => {
    goals.editGoal(req, res);
});

router.post('/addToGoalWithCategory', authentication, (req, res) => {
    goals.addToGoalWithCategory(req, res);
});

router.post('/deleteGoal', authentication, (req, res) => {
    goals.deleteGoal(req, res);
});


router.post('/removeAllDbData', (req, res) => {
    dbController.removeAllDbData(req, res);
});
/*
router.get('/getNewUsers', authentication, (req, res) => {
    connections.getNewUsers(req, res);
});

router.get('/getUserConnections', authentication, (req, res) => {
    connections.getUserConnections(req, res);
});

router.post('/addConnection', authentication, (req, res) => {
    connections.addConnection(req, res);
});

router.get('/getEnvelopesForDropdown', authentication, (req, res) => {
    connections.getEnvelopesForDropdown(req, res);
});
*/
router.post('/createDummyAccounts', (req, res) => {
    dbController.createDummyAccounts(req, res);
});

router.post('/loadCategories', (req, res) => {
    dbController.loadCategories(req, res);
});

router.post('/changeColorCategory', authentication, (req, res) => {
    categories.changeColorCategory(req, res);
})

router.post('/deleteCategory', authentication, (req, res) => {
    categories.deleteCategory(req, res);
});
/*
router.post('/toggleVisible', authentication, (req, res) => {
    connections.toggleVisible(req, res);
});

router.post('/removeConnection', authentication, (req, res) => {
    connections.removeConnection(req, res);
})
*/
router.post('/addFriendGroup', authentication, (req, res) => {
    friendGroup.addFriendGroup(req, res);
})

router.post('/calculateBalances', authentication, (req, res) => {
    friendGroup.calculateBalances(req, res);
})

router.post('/deleteFriendGroup', authentication, (req, res) => {
    friendGroup.deleteFriendGroup(req, res);
})

module.exports = router;