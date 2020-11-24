const mongoose = require('mongoose');
const { categorySchema } = require('./categories')

const envelopesSchema = new mongoose.Schema();
envelopesSchema.add({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    progress: { type: Number, required: true },
    category: { type: String, required: true },
    budget: { type: Number, required: true },
    spent: { type: Number, required: true },
    color: { type: String, required: true },
    colorHex: { type: String, required: true },
    bgColor: { type: String, required: true },
    month: { type: String, required: true },
    category: { type: categorySchema, required: true }
});

mongoose.model('Envelopes', envelopesSchema, 'Envelopes');

module.exports = {
    envelopesSchema: envelopesSchema
}