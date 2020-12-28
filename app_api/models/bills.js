const mongoose = require('mongoose');
const billsSchema = new mongoose.Schema();
const { categorySchema } = require('./categories')

//Bill je primeren za editBill in getBill ne ni
/**
 * @swagger
 * components:
 *  schemas:
 *   Bill:
 *    type: object
 *    properties:
 *     id:
 *      type: string
 *     recipient:
 *      type: string
 *     value:
 *      type: number
 *     category:
 *      type: object
 *      $ref: "#/components/schemas/Categories"
 *     date:
 *      type: string
 *     repeating:
 *      type: string
 *    required:
 *     - id
 *     - recipient
 *     - value
 *     - category
 *     - date
 *     - repeating
 *   addBill:
 *    type: object
 *    properties:
 *     recipient:
 *      type: string
 *     value:
 *      type: number
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
 *      type: number
 *     category:
 *      type: string
 *     date:
 *      type: string
 *     repeating:
 *      type: string
 *    required:
 *     - id
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