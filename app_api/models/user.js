const mongoose = require('mongoose');
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
    isPremium: { type: Boolean, required: true, default: false },
    profilePic: { type: String, required: false },
    language: { type: String, required: true, default: 'English' },
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
    guestName: { type: String, required: true},
    active: { type: Boolean, required: true},
    user: { type: userSchema, required: true },
    hostUser: { type: userSchema, required: true },
    envelopes: [envelopesSchema]
});

mongoose.model('Connections', connectionsSchema, 'Connections');
mongoose.model('User', userSchema, 'User');


module.exports = {
    userSchema: userSchema,
    connectionsSchema: connectionsSchema
}