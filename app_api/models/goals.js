const mongoose = require('mongoose');
const { categorySchema } = require('./categories')

/**
 * @swagger
 * components:
 *  schemas:
 *   getGoal:
 *    type: object
 *    description: Vsi podatki o ciljih uporabnika
 *    properties:
 *     id:
 *      type: string
 *     title:
 *      type: string
 *     save:
 *      type: number
 *     target:
 *      type: number
 *     date:
 *      type: string
 *     category:
 *      type: object
 *      $ref: "#/components/schemas/Categories"
 *    required:
 *     - id
 *     - title
 *     - target
 *     - date
 *     - category
 *   addGoal:
 *    type: object
 *    description: Podatki za kreiranje novega cilja
 *    properties:
 *     title:
 *      type: string
 *     target:
 *      type: number
 *     date:
 *      type: string
 *     category:
 *      type: string
 *    required:
 *     - title
 *     - target
 *     - date
 *     - category
 *   editGoal:
 *    type: object
 *    description: Podatki za urejanje cilja
 *    properties:
 *     id:
 *      type: string
 *     title:
 *      type: string
 *     target:
 *      type: number
 *     date:
 *      type: string
 *     category:
 *      type: string
 *    required:
 *     - id
 *     - title
 *     - target
 *     - date
 *     - category
 *   addMoney:
 *    type: object
 *    description: Podatki za dodajanje denarja k izbranemu cilju
 *    properties:
 *     title:
 *      type: string
 *     amount:
 *      type: number
 *    required:
 *     - title
 *     - amount
 *   deleteGoal:
 *    type: object
 *    description: Vsi podatki za brisanje cilja
 *    properties:
 *     id:
 *      type: string
 *    required:
 *     - id
 */

const goalsSchema = new mongoose.Schema();

goalsSchema.add({
    title: { type: String, required: true },
    target: { type: Number, required: true },
    saved: { type: Number, required: true },
    monthlyTarget: { type: Number, required: true },
    date: { type: Date, required: true },
    category: { type: categorySchema, required: true },
});

mongoose.model('Goals', goalsSchema, 'Goals');

module.exports = {
    goalsSchema: goalsSchema
}