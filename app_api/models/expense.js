const mongoose = require('mongoose');
const { categorySchema } = require('./categories')

/**
 * @swagger
 * components:
 *  schemas:
 *   getExpense:
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
 *     currency:
 *      type: string
 *     date:
 *      type: string
 *    required:
 *     - recipient
 *     - value
 *     - category
 *     - date
 *   addExpense:
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
 *    required:
 *     - recipient
 *     - value
 *     - category
 *     - date
 *   editExpense:
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
 *    required:
 *     - recipient
 *     - value
 *     - category
 *     - date
 */

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