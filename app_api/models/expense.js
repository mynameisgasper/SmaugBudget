const mongoose = require('mongoose');
const { categorySchema } = require('./categories')

const expenseSchema = new mongoose.Schema();
expenseSchema.add({

    date: { type: Date, required: true },
    category: { type: categorySchema, required: true },
    recipient: { type: String, required: true },
    value: { type: Number, required: true },
    currency: { type: String, required: true },
});

mongoose.model('Expense', expenseSchema, 'Expense');

module.exports = {
    expenseSchema: expenseSchema
}