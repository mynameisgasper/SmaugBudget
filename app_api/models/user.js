const mongoose = require('mongoose');
const { envelopesSchema } = require('./envelopes');

const userSchema = new mongoose.Schema();
const connectionsSchema = new mongoose.Schema();

userSchema.add({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    passwordSalt: {type: String, required: true},
    connections: [connectionsSchema],
    envelopes: [envelopesSchema],
    
});

connectionsSchema.add({
    type: {type: String, required: true},
    user: {type: userSchema, required: true},
    envelopes: [envelopesSchema]
});

mongoose.model('Connections', connectionsSchema, 'Connections');
mongoose.model('User', userSchema, 'User');

module.exports = {
    userSchema: userSchema,
    connectionsSchema: connectionsSchema
}