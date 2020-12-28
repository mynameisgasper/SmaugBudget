const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *  schemas:
 *   Currency:
 *    type: object
 *    properties:
 *     currency:
 *      type: string
 *     value:
 *      type: number
 *    required:
 *     - currency
 *     - value
 */

const currencySchema = new mongoose.Schema();

currencySchema.add({
    currency: { type: String, required: true, unique: true},
    value: { type: Number, required: true },
});

mongoose.model('Currency', currencySchema, 'Currency');

module.exports = {
    currencySchema: currencySchema
}