const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { goalsSchema } = require('./goals');
const { billsSchema } = require('./bills');
const { envelopesSchema } = require('./envelopes');
const { categorySchema } = require('./categories');
const { expenseSchema } = require('./expense');
const { friendGroupSchema } = require('./friendGroup');

const userSchema = new mongoose.Schema();
const connectionsSchema = new mongoose.Schema();

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
    connections: [connectionsSchema],
    envelopes: [envelopesSchema],
    goals: [goalsSchema],
    bills: [billsSchema],
    categories: [categorySchema],
    expense: [expenseSchema],
    friendgroups: [friendGroupSchema]
});

connectionsSchema.add({
    name: { type: String, required: true },
    guestName: { type: String, required: true },
    active: { type: Boolean, required: true },
    user: [userSchema],
    hostUser: { type: userSchema, required: true },
    envelopes: [envelopesSchema]
});

userSchema.methods.generateJwt = function() {
    const expirationTime = new Date();
    expirationTime.setDate(expirationTime.getDate() + 7);
  
    return jwt.sign({
      _id: this._id,
      email: this.email,
      firstname: this.firstname,
      lastname: this.lastname,
      exp: parseInt(expirationTime.getTime() / 1000, 10)
    }, process.env.JWT_PASS || 'jwtsigntoken1!');
}

mongoose.model('Connections', connectionsSchema, 'Connections');
mongoose.model('User', userSchema, 'User');

module.exports = {
    userSchema: userSchema,
    connectionsSchema: connectionsSchema
}