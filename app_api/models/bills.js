const mongoose = require('mongoose');
const billsSchema = new mongoose.Schema();
const { categorySchema } = require('./categories')

billsSchema.add({
    id: { type: Number, required: true },
    recipient: { type: String, required: true },
    value: { type: Number, required: true },
    currency: { type: String, required: true },
    date: { type: Date, required: true },
    category: { type: categorySchema, required: true },
});

mongoose.model('bills', billsSchema, 'bills');

module.exports = {
    billsSchema: billsSchema
}