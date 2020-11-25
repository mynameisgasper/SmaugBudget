const mongoose = require('mongoose');
const { goalsSchema } = require('./goals')
const { billsSchema } = require('./bills')
const { categorySchema } = require('./categories')


const userSchema = new mongoose.Schema();
const connectionsSchema = new mongoose.Schema();
const envelopesSchema = new mongoose.Schema();

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


envelopesSchema.add({
    progress: { type: Number, required: true },
    budget: { type: Number, required: true },
    spent: { type: Number, required: true },
    color: { type: String, required: true },
    colorHex: { type: String, required: true },
    bgColor: { type: String, required: true },
    month: { type: String, required: true },
    category: { type: categorySchema, required: true },
});

mongoose.model('Connections', connectionsSchema, 'Connections');
mongoose.model('User', userSchema, 'User');
mongoose.model('Envelopes', envelopesSchema, 'Envelopes');


module.exports = {
    userSchema: userSchema,
    connectionsSchema: connectionsSchema,
    envelopesSchema: envelopesSchema

}