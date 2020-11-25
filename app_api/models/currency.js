const mongoose = require('mongoose');
const currencySchema = new mongoose.Schema();

currencySchema.add({
    currency: { type: String, required: true, unique: true},
    value: { type: Number, required: true },
});

mongoose.model('Currency', currencySchema, 'Currency');

module.exports = {
    currencySchema: currencySchema
}