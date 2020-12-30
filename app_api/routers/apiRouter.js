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
 *  - name: Envelopes
 *    description: Obvladovanje podatkov o kuvertah
 *  - name: Goals
 *    description: Obvladovanje podatkov o ciljih
 *  - name: Bills
 *    description: Obvladovanje podatkov o računih
 *  - name: Expenses 
 *    description: Obvladovanje podatkov o stroških
 *  - name: Utilities
 *    description: Obvladovanje podatkov o prijateljskih skupinah in pretvorniku valut
 *  - name: Database 
 *    description: Obvladovanje podatkov v bazi
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

/**
 * @swagger
 *  /register:
 *   post:
 *    summary: Registracija novega uporabnika
 *    description: Registracija **novega uporabnika** s podatki o imenu, elektronskem naslovu in geslu.
 *    tags: [Avtentikacija]
 *    requestBody:
 *     description: Podatki za registracijo
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/UserRegistration"
 *    responses:
 *     "200":
 *      description: Uspešna registracija uporabnika z JWT žetonom v rezultatu.
 *     "400":
 *      description: Napaka zahteve, pri registraciji so obvezni ime, elektronski naslov in geslo.
 *     "409":
 *      description: Račun s tem e-mail naslovom že obstaja!
 *     "500":
 *      description: Napaka na strežniku.
 */

router.post('/register', (req, res) => {
    user.register(req, res);
});

/**
 * @swagger
 *  /login:
 *   post:
 *    summary: Prijava uporabnika
 *    description: Prijava uporabnika s podatki elektronskem naslovu in geslu.
 *    tags: [Avtentikacija]
 *    requestBody:
 *     description: Podatki za registracijo
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/UserLogin"
 *    responses:
 *     "200":
 *      description: Uspešna prijava uporabnika z JWT žetonom v rezultatu.
 *     "400":
 *      description: Napaka zahteve, pri prijavi sta obvezna elektronski naslov in geslo.
 *     "401":
 *      description: Uporabnik ni potrjen.
 *     "404":
 *      description: Uporabnik s temi podatki ne obstaja.
 *     "500":
 *      description: Napaka na strežniku.
 */

router.post('/login', (req, res) => {
    user.login(req, res);
});

/**
 * @swagger
 *  /requestResetPassword:
 *   post:
 *    summary: Prošnja za ponastavitev gesla uporabnika
 *    description: Prošnja za ponastavitev gesla uporabnika. Vsebuje email uporabnika.
 *    tags: [Uporabnik]
 *    requestBody:
 *     description: Podatki za prošnjo za ponastavitev gesla
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/RequestResetPassword"
 *       example:
 *        email: "gold@smaug.com"
 *    responses:
 *     "200":
 *      description: Uspešno poslan email za spremembo gesla.
 *     "404":
 *      description: Uporabnik ne obstaja.
 *     "500":
 *      description: Napaka na strežniku.
 */

router.post('/requestResetPassword', (req, res) => {
    user.requestResetPassword(req, res);
});

/**
 * @swagger
 *  /resetPassword:
 *   post:
 *    summary: Ponastavitev gesla uporabnika
 *    description: Ponastavitev gesla uporabnika. Vsebuje kodo in geslo.
 *    tags: [Uporabnik]
 *    requestBody:
 *     description: Podatki za ponastavitev gesla
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/ResetPassword"
 *       example:
 *        code: "awdghztjzrs1svuzad123wd123agzjzu12awd1Goldpaass1"
 *        password: "nekineki123+"
 *    responses:
 *     "200":
 *      description: Uspešno spremenjeno geslo.
 *     "400":
 *      description: Napaka zahteve, obvezni so vsi podatki.
 *     "404":
 *      description: Uporabnik ne obstaja.
 *     "500":
 *      description: Napaka na strežniku.
 */

router.post('/resetPassword', (req, res) => {
    user.resetPassword(req, res);
});

/**
 * @swagger
 *  /changePassword:
 *   post:
 *    summary: Sprememba gesla uporabnika
 *    description: Sprememba gesla uporabnika. Vsebuje podatke staro in 2x novo geslo.
 *    tags: [Uporabnik]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: Podatki za sprememba gesla
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/ChangePassword"
 *       example:
 *        oldPassword: "Goldpass1"
 *        newPassword1: "Goldpass2"
 *        newPassword2: "Goldpass2"
 *    responses:
 *     "200":
 *      description: Uspešno spremenjeno geslo.
 *     "400":
 *      description: Napaka zahteve, obvezni so vsi podatki.
 *     "401":
 *      description: Uporabnik ni potrjen.
 *     "500":
 *      description: Napaka na strežniku.
 */

router.post('/changePassword', authentication, (req, res) => {
    user.changePassword(req, res);
});

/**
 * @swagger
 *  /getUser:
 *   get:
 *    summary: Pridobitev podatkov uporabnika
 *    description: API request nam vrne podatke o uporabniku - id, ime, priimek, email, accesslevel, jezik, podatke o plači, valuto, ter vse podatke za funkcionalnosti 
 *    tags: [Uporabnik]
 *    security:
 *     - jwt: []
 *    responses:
 *     "200":
 *      description: Uspešno pridobivanje podatkov.
 *      schema:
 *       $ref: "#/components/schemas/GetUserData"
 *     "400":
 *      description: Napaka zahteve, pri prijavi sta obvezna elektronski naslov in geslo.
 */

router.get('/getUser', authentication, (req, res) => {
    user.retrieveUser(req, res);
});

/*
router.post('/getUserEmail/', authentication, (req, res) => {
    user.retrieveUserEmail(req, res);
});
*/

/**
 * @swagger
 *  /confirm/{urlCode}/{code}:
 *   all:
 *    summary: Redirect za potrjevanje registracije.
 *    description: Redirect za potrjevanje registracije.
 *    tags: [Avtentikacija]
 *    parameters:
 *     - in: path
 *       name: urlCode
 *       schema:
 *        type: string
 *       required: true
 *     - in: path
 *       name: code
 *       schema:
 *        type: string
 *       required: true
 *    responses:
 *     "200":
 *      description: Uspešno potrjena registracija.
 *     "400":
 *      description: Napaka zahteve, obvezni so vsi podatki.
 *     "401":
 *      description: Uporabnik ni potrjen.
 *     "404":
 *      description: Stran ne obstaja.
 *     "500":
 *      description: Napaka na strežniku.
 */

router.all('/confirm/:urlCode/:code', (req, res) => {
    user.confirm(req, res);
});


/**
 * @swagger
 *  /changeIncome:
 *   post:
 *    summary: Spreminjanje uporabnikove plače.
 *    description: Spreminjanje uporabnikove plače. Vsebuje podatka o velikosti plače ter o dnevu v mesecu, ko prejme plačo.
 *    tags: [Uporabnik]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: Podatki za posodobitev plače uporabnika
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/ChangeIncome"
 *       example:
 *        amount: 1300
 *        date: 12
 *    responses:
 *     "200":
 *      description: Uspešno posodobljeni podatki uporabnika.
 *     "400":
 *      description: Napaka zahteve, obvezni so vsi podatki.
 *     "401":
 *      description: Uporabnik ni potrjen.
 *     "404":
 *      description: Uporabnik ne obstaja.
 *     "500":
 *      description: Napaka na strežniku.
 */


router.post('/changeIncome', authentication, (req, res) => {
    user.changeIncome(req, res);
});

/**
 * @swagger
 *  /uploadPfp:
 *   post:
 *    summary: Nalaganje slike.
 *    description: Nalaganje uporabnikove slike, ki je vidna v navbaru ter nastavitvah.
 *    tags: [Database]
 *    responses:
 *     "200":
 *      description: Uspešna naložena slika.
 *     "401":
 *      description: Uporabnik ni potrjen.
 *     "404":
 *      description: Pot do slike ne obstaja.
 *     "500":
 *      description: Napaka na strežniku.
 */

router.post('/uploadPfp', authentication, user.uploadImg, user.postImg);

/**
 * @swagger
 *  /getPfp:
 *   post:
 *    summary: Pridobivanje slike.
 *    description: Pridobivanje uporabnikove slike, ki je vidna v navbaru ter nastavitvah.
 *    tags: [Database]
 *    responses:
 *     "200":
 *      description: Uspešna pridobljena slika.
 *     "401":
 *      description: Uporabnik ni potrjen.
 *     "404":
 *      description: Uporabnik ne obstaja.
 *     "500":
 *      description: Napaka na strežniku.
 */

router.get('/getPfp', authentication, (req, res) => {
    user.getPfp(req, res);
});

/**
 * @swagger
 *  /updateUser:
 *   post:
 *    summary: Spreminjanje podatkov uporabnika
 *    description: Spreminjanje podatkov uporabnika. Vsebuje podatke - id kuverte in novo proračun. Spreminjamo samo jezik, samo valuto ali email ime ter priimek skupaj.
 *    tags: [Uporabnik]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: Podatki za posodobitev podatkov uporabnik
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/ChangeUserData"
 *       example:
 *        firstname: "Gold"
 *        lastname: "Smaug"
 *        email: "goldic@smaug.com"
 *        password: "Goldsmaug2"
 *        language: "Slovenski"
 *        defaultCurrency: "USD"
 *    responses:
 *     "200":
 *      description: Uspešno posodobljeni podatki uporabnika.
 *     "401":
 *      description: Uporabnik ni potrjen.
 *     "400":
 *      description: Uporabnik ne obstaja.
 *     "500":
 *      description: Napaka na strežniku.
 */

router.post('/updateUser', authentication, (req, res) => {
    user.updateUser(req, res);
});

/*
router.post('/setCurrency', authentication, (req, res) => {
    user.setCurrency(req, res);
});
*/

/**
 * @swagger
 *  /deleteUser:
 *   post:
 *    summary: Brisanje uporabnika in njegovih podatkov
 *    description: Brisanje uporabnika in njegovih podatkov
 *    tags: [Uporabnik]
 *    security:
 *     - jwt: []
 *    responses:
 *     "204":
 *      description: Uspešno brisanje uporabniškega računa.
 *     "401":
 *      description: Uporabnik ni potrjen.
 *     "404":
 *      description: Uporabnik s temi podatki ne obstaja.
 *     "500":
 *      description: Napaka na strežniku.
 */


router.post('/deleteUser', authentication, (req, res) => {
    user.deleteUser(req, res);
});

/**
 * @swagger
 *  /addEnvelope:
 *   post:
 *    summary: Kreiranje novega kuverte
 *    description: Kreiranje nove kuverte s pripadujočimi podatki - kategorija kuverte, prejemnik plačila, vrednost proračuna, barvo kuverte, mesec kuverte.
 *    tags: [Envelopes]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: Podatki za kreiranje kuverte
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/addEnvelope"
 *       example:
 *        categoryAddEnvelope: "Golf"
 *        inputAmount: 300
 *        colorPicker: "#db3d3d"
 *        month: "11"
 *    responses:
 *     "201":
 *      description: Uspešno kreiran strošek in dodan v kuverto.
 *     "400":
 *      description: Napaka zahteve, obvezni so vsi podatki ali pa kuverta s tem imenom že obstaja.
 *     "401":
 *      description: Uporabnik ni potrjen.
 *     "500":
 *      description: Napaka na strežniku.
 */

router.post('/addEnvelope', authentication, (req, res) => {
    envelopes.addEnvelope(req, res);
});

/**
 * @swagger
 *  /editEnvelope:
 *   post:
 *    summary: Spreminjanje podatkov kuverte
 *    description: Spreminjanje podatkov kuverte. Vsebuje podatke - id kuverte in novo proračun.
 *    tags: [Envelopes]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: Podatki za posodobitev kuverte
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/editEnvelope"
 *       example:
 *        id: "5feb637ce10cc08e4a48ee18"
 *        inputAmount: 500
 *    responses:
 *     "200":
 *      description: Uspešno posodobljena kuverta.
 *     "400":
 *      description: Napaka zahteve, obvezni so vsi podatki.
 *     "401":
 *      description: Uporabnik ni potrjen.
 *     "500":
 *      description: Napaka na strežniku.
 */

router.post('/editEnvelope', authentication, (req, res) => {
    envelopes.editEnvelope(req, res);
});

/**
 * @swagger
 *  /deleteEnvelope:
 *   post:
 *    summary: Brisanje kuverte
 *    description: Brisanje kuverte z vsemi podatki
 *    tags: [Envelopes]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: Podatki za brisanje kuverte.
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/deleteEnvelope"
 *       example:
 *        envelope_id: "5feb637ce10cc08e4a48ee18"
 *    responses:
 *     "204":
 *      description: Uspešno brisanje kuverte.
 *     "400":
 *      description: Napaka zahteve, obvezni so vsi podatki.
 *     "401":
 *      description: Uporabnik ni potrjen.
 *     "404":
 *      description: Kuverta s temi podatki ne obstaja.
 *     "500":
 *      description: Napaka na strežniku.
 */

router.post('/deleteEnvelope', authentication, (req, res) => {
    envelopes.deleteEnvelope(req, res);
});

/**
 * @swagger
 *  /addExpense:
 *   post:
 *    summary: Kreiranje novega stroška (dodajanje stroška v kuverto)
 *    description: Kreiranje novega stroška s pripadujočimi podatki - prejemnik plačila, vrednost stroška, datum računa, kategorija stroška. Stroške se avtomatsko doda v kuverto.
 *    tags: [Expenses]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: Podatki za kreiranje stroška
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/addBill"
 *       example:
 *        recipient: "Simobil"
 *        inputAmount: "50"
 *        date: "2020-12-15T00:00:00.000Z"
 *        category: "Electronics"
 *    responses:
 *     "201":
 *      description: Uspešno kreiran strošek in dodan v kuverto.
 *     "400":
 *      description: Napaka zahteve, obvezni so vsi podatki.
 *     "401":
 *      description: Uporabnik ni potrjen.
 *     "500":
 *      description: Napaka na strežniku.
 */

router.post('/addExpense', authentication, (req, res) => {
    envelopes.addExpense(req, res);
});

/**
 * @swagger
 *  /editExpense:
 *   post:
 *    summary: Spreminjanje podatkov stroškov
 *    description: Spreminjanje podatkov stroškov. Vsebuje podatke - id stroška, nov prejemnik stroška, novo vrednost, nov datum računa in novo kategorijo.
 *    tags: [Expenses]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: Podatki za posodobitev strška
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/editExpense"
 *       example:
 *        expId: "5feb637ce10cc08e4a48ee3c"
 *        payee: "Simobil"
 *        amount: 50
 *        expCategory: "Electronics"
 *        date: "2020-12-02'"
 *    responses:
 *     "200":
 *      description: Uspešno posodobljen strošek.
 *     "400":
 *      description: Napaka zahteve, obvezni so vsi podatki.
 *     "401":
 *      description: Uporabnik ni potrjen.
 *     "500":
 *      description: Napaka na strežniku.
 */


router.post('/editExpense', authentication, (req, res) => {
    history.editExpense(req, res);
});

/**
 * @swagger
 *  /getExpenses:
 *   get:
 *    summary: Filtriranje in pagination stroškov
 *    description: Filtriranje in pagination stroškov
 *    tags: [Expenses]
 *    security:
 *     - jwt: []
 *    parameters:
 *     - in: query
 *       name: filter
 *       description: Podatek po kateremu filtriramo.
 *       schema:
 *        type: string
 *       required: true
 *     - in: query
 *       name: offset
 *       description: Število stroškov, ki jih preskočimo.
 *       schema:
 *        type: string
 *       required: true
 *     - in: query
 *       name: limit
 *       description: Število stroškov, ki jih vrnemo.
 *       schema:
 *        type: number
 *    responses:
 *     "200":
 *      description: Uspešno pridobivanje podatkov.
 *     "404":
 *      description: Uporabnik ne obstaja!
 *     "500":
 *      description: Napaka na strežniku.
 */

router.get('/getExpenses', authentication, (req, res) => {
    history.getExpenses(req, res);
});

/*
router.post('/getLastMonthExpenses', authentication, (req, res) => {
    history.getLastMonthExpenses(req, res);
});
*/

/**
 * @swagger
 *  /converter:
 *   get:
 *    summary: Pretvornik valut
 *    description: Po vstavitvi izbranih dveh valut in zneska vrne znesek v novi valuti.
 *    tags: [Utilities]
 *    security:
 *     - jwt: []
 *    parameters:
 *     - in: query
 *       name: curr1
 *       description: Ime prve valute
 *       schema:
 *        type: string
 *       required: true
 *     - in: query
 *       name: curr2
 *       description: Ime druge valute
 *       schema:
 *        type: string
 *       required: true
 *     - in: query
 *       name: amm1
 *       description: Znesek prve valute, ki ga želimo pretvoriti v drugo valuto.
 *       schema:
 *        type: number
 *    responses:
 *     "200":
 *      description: Uspešno pridobivanje podatkov.
 *     "404":
 *      description: Valuta ne obstaja!
 */

router.get('/converter', authentication, (req, res) => {
    converter.converter(req, res);
});

/**
 * @swagger
 *  /addBill:
 *   post:
 *    summary: Kreiranje novega računa - ne uporabniškega
 *    description: Kreiranje novega računa s pripadujočimi podatki - prejemnik plačila, vrednost računa, datum računa, kategorija računa ter ponavljanje računa
 *    tags: [Bills]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: Podatki za kreiranje računa
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/addBill"
 *       example:
 *        Payee: "Simobil"
 *        Amount: "50"
 *        inputDateAddBill: "2021-01-30T00:00:00.000Z"
 *        inputCategory: "Electronics"
 *        rad: "monthly"
 *    responses:
 *     "201":
 *      description: Uspešno kreiran račun.
 *     "400":
 *      description: Napaka zahteve, obvezni.
 *     "401":
 *      description: Uporabnik ni potrjen.
 *     "500":
 *      description: Napaka na strežniku.
 */

router.post('/addBill', authentication, (req, res) => {
    bills.addBill(req, res);
});

/**
 * @swagger
 *  /editBill:
 *   post:
 *    summary: Spreminjanje podatkov računa - ne uporabniškega
 *    description: Spreminjanje podatkov računa. Vsebuje podatke - id računa, novo prejemnik plačila, novo vrednost, nov datum računa, novo kategorijo in na novo podano ponavljanje računa
 *    tags: [Bills]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: Podatki za posodobitev računa
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/editBill"
 *       example:
 *        billId: "5feb5d0586861e7788e15436"
 *        payee: "Simobil"
 *        amount: 50
 *        inputCategory: "Phone"
 *        date: "2021-02-02'"
 *        repeat: "monthly"
 *    responses:
 *     "200":
 *      description: Uspešno posodobljen račun.
 *     "400":
 *      description: Napaka zahteve, obvezni so vsi podatki.
 *     "401":
 *      description: Uporabnik ni potrjen.
 *     "500":
 *      description: Napaka na strežniku.
 */

router.post('/editBill', authentication, (req, res) => {
    bills.editBill(req, res);
});

/**
 * @swagger
 *  /deleteBill:
 *   post:
 *    summary: Brisanje računa - ne uporabniškega računa
 *    description: Brisanje računa z vsemi podatki
 *    tags: [Bills]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: Podatki za brisanje računa.
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/deleteBill"
 *       example:
 *        bill_id: "5feb5d0586861e7788e15436"
 *    responses:
 *     "204":
 *      description: Uspešna brisanje računa.
 *     "400":
 *      description: Napaka zahteve, obvezni so vsi podatki.
 *     "401":
 *      description: Uporabnik ni potrjen.
 *     "404":
 *      description: Račun s temi podatki ne obstaja.
 *     "500":
 *      description: Napaka na strežniku.
 */

router.post('/deleteBill', authentication, (req, res) => {
    bills.deleteBill(req, res);
});

/**
 * @swagger
 *  /addGoal:
 *   post:
 *    summary: Kreiranje novega cilja
 *    description: Kreiranje novega cilja s pripadujočimi podatki - ime cilja, ciljma vrednost privarčevanega denarja, ciljni datum in kategorija.
 *    tags: [Goals]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: Podatki za kreiranje cilja
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/addGoal"
 *       example:
 *        name: "New phone"
 *        amount: "300"
 *        date: "2021-01-30T00:00:00.000Z"
 *        category: "Electronics"
 *    responses:
 *     "201":
 *      description: Uspešno kreiran cilj.
 *     "400":
 *      description: Napaka zahteve, obvezni so vsi podatki ali pa cilj s tem imenom že obstaja.
 *     "401":
 *      description: Uporabnik ni potrjen.
 *     "500":
 *      description: Napaka na strežniku.
 */

router.post('/addGoal', authentication, (req, res) => {
    goals.addGoal(req, res);
});

/**
 * @swagger
 *  /editGoal:
 *   post:
 *    summary: Spreminjanje podatkov zastavljenega cilja uporabnika
 *    description: Spreminjanje podatkov zastavljenega cilja uporabnika. Vsebuje podatke - id cilja, novo ime cilja, novo ciljno vrednost, nov ciljni datum in novo kategorijo.
 *    tags: [Goals]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: Podatki za posodobitev cilja
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/editGoal"
 *       example:
 *        goal_id: "5feb546ad99c505c0677195a"
 *        name: "Playstation"
 *        amount: 800
 *        date: "2025-07-01T00:00:00.000Z"
 *        category: "Electronics"
 *    responses:
 *     "200":
 *      description: Uspešno dodan denar v cilj.
 *     "400":
 *      description: Napaka zahteve, obvezni so vsi podatki.
 *     "401":
 *      description: Uporabnik ni potrjen.
 *     "500":
 *      description: Napaka na strežniku.
 */

router.post('/editGoal', authentication, (req, res) => {
    goals.editGoal(req, res);
});

/**
 * @swagger
 *  /addToGoalWithCategory:
 *   post:
 *    summary: Dodajanje denarja k izbranemu zastavljenemu cilju uporabnika
 *    description: Dodajanje denarja k izbranemu zastavljenemu cilju uporabnika. Vsebuje podatka o kategoriji ter znesku denarja.
 *    tags: [Goals]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: Podatki za dodajanje denarja
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/addMoney"
 *       example:
 *        title: "Playstation 5"
 *        amount: 100
 *    responses:
 *     "200":
 *      description: Uspešno dodan denar v cilj.
 *     "400":
 *      description: Napaka zahteve, obvezni so vsi podatki.
 *     "401":
 *      description: Uporabnik ni potrjen.
 *     "500":
 *      description: Napaka na strežniku.
 */

router.post('/addToGoalWithCategory', authentication, (req, res) => {
    goals.addToGoalWithCategory(req, res);
});

/**
 * @swagger
 *  /deleteGoal:
 *   post:
 *    summary: Brisanje cilja
 *    description: Brisanje cilja uporabnika z vsemi podatki
 *    tags: [Goals]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: Podatki za brisanje cilja.
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/deleteGoal"
 *       example:
 *        goal_id: "5feb3dcb496be31c4f6574db"
 *    responses:
 *     "204":
 *      description: Uspešna brisanje cilja.
 *     "400":
 *      description: Napaka zahteve, obvezni so vsi podatki.
*      "401":
 *      description: Uporabnik ni potrjen.
 *     "404":
 *      description: Cilj s temi podatki ne obstaja.
 *     "500":
 *      description: Napaka na strežniku.
 */

router.post('/deleteGoal', authentication, (req, res) => {
    goals.deleteGoal(req, res);
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

/**
 * @swagger
 *  /removeAllDbData:
 *   post:
 *    summary: Brisanje podatkov v bazi.
 *    description: Brisanje vseh podatakov v bazi.
 *    tags: [Database]
 *    responses:
 *     "204":
 *      description: Uspešna brisanje vseh podatkov iz baze.
 *     "500":
 *      description: Napaka na strežniku.
 */

router.post('/removeAllDbData', (req, res) => {
    dbController.removeAllDbData(req, res);
});

/**
 * @swagger
 *  /createDummyAccounts:
 *   post:
 *    summary: Vnašanje podatkov uporabnikov v bazo.
 *    description: Vnašanje podatkov uporabnikov v bazo.
 *    tags: [Database]
 *    responses:
 *     "200":
 *      description: Uspešno vnašanje podatkov v baz.
 *     "500":
 *      description: Napaka na strežniku.
 */

router.post('/createDummyAccounts', (req, res) => {
    dbController.createDummyAccounts(req, res);
});

/*
router.post('/loadCategories', (req, res) => {
    dbController.loadCategories(req, res);
});*/

/**
 * @swagger
 *  /changeColorCategory:
 *   post:
 *    summary: Menjava barve kategorije
 *    description: Menjava barve kategorije
 *    tags: [Uporabnik]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: Podatki za spremembo barve kategorije
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/changeColorCategory"
 *       example:
 *        category_id: "5feb7f18467e3de04ef1ccd9"
 *        colorPicker: "#db3d3d"
 *    responses:
 *     "200":
 *      description: Uspešno spremenjena barva kategorije.
 *     "400":
 *      description: Napaka zahteve, obvezni so vsi podatki.
 *     "401":
 *      description: Uporabnik ni potrjen.
 *     "500":
 *      description: Napaka na strežniku.
 */

router.post('/changeColorCategory', authentication, (req, res) => {
    categories.changeColorCategory(req, res);
})

/**
 * @swagger
 *  /deleteCategory:
 *   post:
 *    summary: Brisanje kategorije
 *    description: Brisanje kategorije uporabnika z vsemi podatki
 *    tags: [Uporabnik]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: Podatki za brisanje kategorije.
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/deleteCategory"
 *       example:
 *        category_id: "5feb7f18467e3de04ef1ccd9"
 *    responses:
 *     "204":
 *      description: Uspešna brisanje kategorije.
 *     "401":
 *      description: Uporabnik ni potrjen.
 *     "500":
 *      description: Napaka na strežniku.
 */

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

/**
 * @swagger
 *  /addFriendGroup:
 *   post:
 *    summary: Kreiranje nove skupine s prijatelji
 *    description: Kreiranje nove skupine s prijatelji z vsemi pripadujočimi podatki - ime skupine ter podatki o prijateljih
 *    tags: [Utilities]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: Podatki za kreiranje skupine
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/addFriendGroup"
 *       example:
 *        name: "skupina1"
 *        friends: "[\"ena1\",\"dva2\",\"tr3i\"]"
 *    responses:
 *     "201":
 *      description: Uspešno kreirana skupina.
 *     "400":
 *      description: Napaka zahteve, obvezni so vsi podatki.
 *     "401":
 *      description: Uporabnik ni potrjen.
 *     "404":
 *      description: Uporabnik s temi podatki ne obstaja.
 *     "500":
 *      description: Napaka na strežniku.
 */
router.post('/addFriendGroup', authentication, (req, res) => {
    friendGroup.addFriendGroup(req, res);
})

/**
 * @swagger
 *  /calculateBalances:
 *   post:
 *    summary: Vstavitev novih podatkov o prijateljih v skupini
 *    description: API vzame nove podatke in izračuna nove vrednosti v skupini
 *    tags: [Utilities]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: Podatki za posodobitev skupine
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/calculateBalances"
 *       example:
 *        group_id: "5feb3dcb496be31c4f6574e7"
 *        friends: "[[1,5],[2,4],[3,3],[4,2],[5,1]]"
 *    responses:
 *     "200":
 *      description: Uspešno posodobljena skupina.
 *     "400":
 *      description: Napaka zahteve, obvezni so vsi podatki.
 *     "401":
 *      description: Uporabnik ni potrjen.
 *     "404":
 *      description: Uporabnik s temi podatki ne obstaja.
 *     "500":
 *      description: Napaka na strežniku.
 */
router.post('/calculateBalances', authentication, (req, res) => {
    friendGroup.calculateBalances(req, res);
})

/**
 * @swagger
 *  /deleteFriendGroup:
 *   post:
 *    summary: Brisanje skupine
 *    description: Brisanje skupine prijatelje za upravljanje medsebojnih plačil.
 *    tags: [Utilities]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: Podatki za brisanje skupine.
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/deleteFriendGroup"
 *       example:
 *        group_id: "5feb3dcb496be31c4f6574e7"
 *    responses:
 *     "204":
 *      description: Uspešna brisanje skupine.
 *     "400":
 *      description: Napaka zahteve, obvezni so vsi podatki.
 *     "401":
 *      description: Uporabnik ni potrjen.
 *     "404":
 *      description: Uporabnik s temi podatki ne obstaja.
 *     "500":
 *      description: Napaka na strežniku.
 */
router.post('/deleteFriendGroup', authentication, (req, res) => {
    friendGroup.deleteFriendGroup(req, res);
})

module.exports = router;