const mongoose = require('mongoose');
const { categorySchema } = require('./categories')

/**
 * @swagger
 * components:
 *  schemas:
 *   getExpense:
 *    type: object
 *    description: Vsi podatki o stroških
 *    properties:
 *     id:
 *      type: string
 *      description: ID stroška
 *     recipient:
 *      type: string
 *      description: Prejemnik plačila
 *     value:
 *      type: number
 *      description: Znesek plačila
 *     category:
 *      type: object
 *      description: Kategorija stroška
 *      $ref: "#/components/schemas/Categories"
 *     currency:
 *      type: string
 *      description: Valuta plačila
 *     date:
 *      type: string
 *      description: Datum plačila
 *    required:
 *     - recipient
 *     - value
 *     - category
 *     - date
 *   addExpense:
 *    type: object
 *    description: Podatki za dodajanje stroška
 *    properties:
 *     recipient:
 *      type: string
 *      description: Prejemnik plačila
 *     inputAmount:
 *      type: number
 *      description: Znesek plačila
 *     category:
 *      type: string
 *      description: Kategorija stroška
 *     date:
 *      type: string
 *      description: Datum plačila
 *    required:
 *     - recipient
 *     - inputAmount
 *     - category
 *     - date
 *   editExpense:
 *    type: object
 *    description: Podatki za urejanje stroška
 *    properties:
 *     expId:
 *      type: string
 *     payee:
 *      type: string
 *     amount:
 *      type: number
 *     expCategory:
 *      type: string
 *     date:
 *      type: string
 *    required:
 *     - expId
 *     - payee
 *     - amount
 *     - expCategory
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