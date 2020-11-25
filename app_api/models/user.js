const mongoose = require('mongoose');
const { goalsSchema } = require('./goals')
const { billsSchema } = require('./bills')
const { envelopesSchema } = require('./envelopes')

const userSchema = new mongoose.Schema();
const connectionsSchema = new mongoose.Schema();

userSchema.add({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    passwordSalt: { type: String, required: true },
    paycheck: { type: Number, required: false },
    paycheckDate: { type: Number, required: false },
    confirmationUrl: { type: String },
    confirmationCode: { type: String },
    balance: { type: Number, required: false },
    isPremium: { type: Boolean, required: true },
    connections: [connectionsSchema],
    envelopes: [envelopesSchema],
    goals: [goalsSchema],
    bills: [billsSchema]
});

connectionsSchema.add({
    type: { type: String, required: true },
    user: { type: userSchema, required: true },
    envelopes: [envelopesSchema]
});

mongoose.model('Connections', connectionsSchema, 'Connections');
mongoose.model('User', userSchema, 'User');


module.exports = {
    userSchema: userSchema,
    connectionsSchema: connectionsSchema
}