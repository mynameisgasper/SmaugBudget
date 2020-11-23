const mongoose = require('mongoose');

const envelopesSchema = new mongoose.Schema();
envelopesSchema.add({
    category: {type: String, required: true},
    budget: {type: Number, required: true},
    spent: {type: Number, required: false},
    date: {type: Date, required: true},
    envelopeParent: {type: envelopesSchema, required: false}
});

mongoose.model('Envelopes', envelopesSchema, 'Envelopes');

module.exports = {
    envelopesSchema: envelopesSchema
}