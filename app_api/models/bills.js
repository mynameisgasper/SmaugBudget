const mongoose = require('mongoose');
const billsSchema = new mongoose.Schema();
const { categorySchema } = require('./categories')

/**
 * @swagger
 * components:
 *  schemas:
 *   Bill:
 *    type: object
 *    description: Vsi podatki o računu
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
 *    description: Vsi podatki za kreiranje novega računa
 *    properties:
 *     Payee:
 *      type: string
 *      description: Recipient of the payment
 *     Amount:
 *      type: number
 *      description: Amount to pay
 *     inputCategory:
 *      type: string
 *      description: Category of bill
 *     inputDateAddBill:
 *      type: string
 *      description: Date due
 *     rad:
 *      type: string
 *      description: Bill recurrence - only once, monthly, yearly
 *    required:
 *     - Payee
 *     - Amount
 *     - inputCategory
 *     - inputDateAddBill
 *     - rad
 *   editBill:
 *    type: object
 *    description: Vsi podatki za urejanje računa
 *    properties:
 *     billId:
 *      type: string
 *      description: Bill id
 *     payee:
 *      type: string
 *      description: Recipient of the payment
 *     amount:
 *      type: number
 *      description: Amount to pay
 *     inputCategory:
 *      type: string
 *      description: Category of bill
 *     date:
 *      type: string
 *      description: Date due
 *     repeat:
 *      type: string
 *      description: Bill recurrence - only once, monthly, yearly
 *    required:
 *     - billId
 *     - payee
 *     - amount
 *     - inputCategory
 *     - date
 *     - repeat
 *   deleteBill:
 *    type: object
 *    description: Vsi podatki za brisanje računa
 *    properties:
 *     bill_id:
 *      type: string
 *      description: Bill id
 *    required:
 *     - bill_id
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