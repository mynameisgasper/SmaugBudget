const mongoose = require('mongoose');
const billsSchema = new mongoose.Schema();
const { categorySchema } = require('./categories')

/**
 * @swagger
 * components:
 *  schemas:
 *   addBill:
 *    type: object
 *    properties:
 *     recipient:
 *      type: string
 *     value:
 *      type: Number
 *     category:
 *      type: string
 *     date:
 *      type: string
 *     repeating:
 *      type: string
 *    required:
 *     - recipient
 *     - value
 *     - category
 *     - date
 *     - repeating
 *   editBill:
 *    type: object
 *    properties:
 *     id:
 *      type: string
 *     recipient:
 *      type: string
 *     value:
 *      type: Number
 *     category:
 *      type: string
 *     date:
 *      type: string
 *     repeating:
 *      type: string
 *    required:
 *     - recipient
 *     - value
 *     - category
 *     - date
 *     - repeating
 *   deleteBill:
 *    type: object
 *    properties:
 *     id:
 *      type: string
 *    required:
 *     - id
 */

billsSchema.add({
    recipient: { type: String, required: true },
    value: { type: Number, required: true },
    category: { type: categorySchema, required: true },
    date: { type: Date, required: true },
    currency: { type: String, required: true },
    repeating: {type: String, required: true}
});

mongoose.model('Bills', billsSchema, 'Bills');

module.exports = {
    billsSchema: billsSchema
}