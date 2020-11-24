const mongoose = require('mongoose');
const billsSchema = new mongoose.Schema();
const { categorySchema } = require('./categories')

billsSchema.add({
    recipient: { type: String, required: true },
    value: { type: Number, required: true },
    category: { type: categorySchema, required: true },
    date: { type: Date, required: true },
    currency: { type: String, required: true },
    repeating: {type: String, required: true}
});

mongoose.model('bills', billsSchema, 'bills');

module.exports = {
    billsSchema: billsSchema
}