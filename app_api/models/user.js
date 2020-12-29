const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { goalsSchema } = require('./goals');
const { billsSchema } = require('./bills');
const { envelopesSchema } = require('./envelopes');
const { categorySchema } = require('./categories');
const { expenseSchema } = require('./expense');
const { friendGroupSchema } = require('./friendGroup');

//treba dodat friend groupe pa njihove sheme nardit pa za utility kar je

/**
 * @swagger
 * components:
 *  schemas:
 *   GetUserData:
 *    type: object
 *    description: Vsi podatki uporabnika za funkcionalnost strani
 *    properties:
 *     _id:
 *      type: string
 *     firstname:
 *      type: string
 *     lastname:
 *      type: string
 *     email:
 *      type: string
 *     accessLevel:
 *      type: integer
 *     language:
 *      type: string
 *     password:
 *      type: string
 *     passwordSalt:
 *      type: string
 *     paycheck:
 *      type: number
 *     paycheckDate:
 *      type: number
 *     paycheckLastMonth:
 *      type: number
 *     defaultCurrency:
 *      type: string
 *     __v:
 *      type: string
 *     bills:
 *      type: object
 *      $ref: "#/components/schemas/Bill"
 *     categories:
 *      type: object
 *      $ref: "#/components/schemas/Categories"
 *     envelopes:
 *      type: object
 *      $ref: "#/components/schemas/getEnvelope"
 *     expense:
 *      type: object
 *      $ref: "#/components/schemas/getExpense"
 *     goals:
 *      type: object
 *      $ref: "#/components/schemas/getGoal"
 *    required:
 *     - _id
 *     - firstname
 *     - lastname
 *     - email
 *     - accessLevel
 *     - language
 *     - password
 *     - passwordSalt
 *     - paycheck
 *     - paycheckDate
 *     - paycheckLastMonth
 *     - defaultCurrency
 *     - _v
 *     - bills
 *     - categories
 *     - envelopes
 *     - expense
 *     - goals
 *   UserLogin:
 *    type: object
 *    description: Podatki uporabnika za prijavo
 *    properties:
 *     email:
 *      type: string
 *      description: elektronski naslov
 *      example: smaug@gold.si
 *     password:
 *      type: string
 *      format: password
 *      example: SmaugPass1
 *    required:
 *     - email
 *     - password
 *   UserRegistration:
 *    type: object
 *    description: Podatki uporabnika za registracijo
 *    properties:
 *     nameup:
 *      type: string
 *      description: ime
 *      example: Gasper
 *     surnameup:
 *      type: string
 *      description: priimek
 *      example: Stepec
 *     email1up:
 *      type: string
 *      description: elektronski naslov
 *      example: smaug@gold.si
 *     email2up:
 *      type: string
 *      description: elektronski naslov
 *      example: smaug@gold.si
 *     password1up:
 *      type: string
 *      format: password
 *      example: SmaugPass1
 *     password2up:
 *      type: string
 *      format: password
 *      example: SmaugPass1
 *    required:
 *     - firstname
 *     - lastname
 *     - email
 *     - password
 *   AuthenticationAnswer:
 *    type: object
 *    description: Rezultat uspešne avtentikacije uporabnika
 *    properties:
 *     token:
 *      type: string
 *      description: JWT token
 *     required:
 *     - token
 *   ChangeIncome:
 *    type: object
 *    description: Podatki za spremembo uporabnikove plače
 *    properties:
 *     amount:
 *      type: number
 *     date:
 *      type: number
 *    required:
 *     - paycheck
 *     - paycheckDate
 *   ChangePassword:
 *    type: object
 *    description: Podatki za spremembo gesla
 *    properties:
 *     oldPassword:
 *      type: number
 *     newPassword1:
 *      type: number
 *     newPassword2:
 *      type: number
 *    required:
 *     - oldPassword
 *     - newPassword1
 *     - newPassword2
 *   ChangeUserData:
 *    type: object
 *    description: Podatki za spremembo uporabnikovih podatkov
 *    properties:
 *     firstname:
 *      type: string
 *     lastname:
 *      type: string
 *     email:
 *      type: string
 *     language:
 *      type: string
 *     defaultCurrency
 *      type: string
 *   ResetPassword:
 *    type: object
 *    description: Shema za resetiranje gesla
 *    properties:
 *     code:
 *      type: string
 *     password:
 *      type: string
 *   RequestResetPassword:
 *    type: object
 *    description: Shema za prošnjo za resetiranje gesla
 *    properties:
 *     email:
 *      type: string
 */

const userSchema = new mongoose.Schema();
//const connectionsSchema = new mongoose.Schema();

userSchema.add({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    passwordSalt: { type: String, required: true },
    paycheck: { type: Number, required: false },
    paycheckLastMonth: { type: Number, required: false },
    paycheckDate: { type: Number, required: false },
    confirmationUrl: { type: String },
    confirmationCode: { type: String },
    resetPasswordCode: { type: String },
    balance: { type: Number, required: false },
    accessLevel: { type: Number, required: true, default: 0 },
    profilePic: { type: String, required: false },
    language: { type: String, required: true, default: 'English' },
    defaultCurrency: { type: String, required: true, default: 'EUR' },
    //connections: [connectionsSchema],
    envelopes: [envelopesSchema],
    goals: [goalsSchema],
    bills: [billsSchema],
    categories: [categorySchema],
    expense: [expenseSchema],
    friendgroups: [friendGroupSchema]
});
/*
connectionsSchema.add({
    name: { type: String, required: true },
    guestName: { type: String, required: true },
    active: { type: Boolean, required: true },
    user: [userSchema],
    hostUser: { type: userSchema, required: true },
    envelopes: [envelopesSchema]
});
*/
userSchema.methods.generateJwt = function() {
    const expirationTime = new Date();
    expirationTime.setDate(expirationTime.getDate() + 7);
  
    return jwt.sign({
      _id: this._id,
      email: this.email,
      firstname: this.firstname,
      lastname: this.lastname,
      accessLevel: this.accessLevel,
      exp: parseInt(expirationTime.getTime() / 1000, 10)
    }, process.env.JWT_PASS || 'jwtsigntoken1!');
}

//mongoose.model('Connections', connectionsSchema, 'Connections');
mongoose.model('User', userSchema, 'User');

module.exports = {
    userSchema: userSchema
    //connectionsSchema: connectionsSchema
}