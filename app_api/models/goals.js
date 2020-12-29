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
 *     name:
 *      type: string
 *      description: Ime novega cilja
 *     amount:
 *      type: number
 *      description: Vsota, ki jo mora uporabnik zbrati za dosego cilja
 *     date:
 *      type: string
 *      description: Predviden rok za dosego cilja
 *     category:
 *      type: string
 *      description: Kategorija cilja
 *    required:
 *     - name
 *     - amount
 *     - date
 *     - category
 *   editGoal:
 *    type: object
 *    description: Podatki za urejanje cilja
 *    properties:
 *     goal_id:
 *      type: string
 *     name:
 *      type: string
 *      description: Novo ime cilja
 *     amount:
 *      type: number
 *      description: Nova vota, ki jo mora uporabnik zbrati za dosego cilja
 *     date:
 *      type: string
 *      description: Nov predviden rok za dosego cilja
 *     category:
 *      type: string
 *      description: Nova kategorija cilja
 *    required:
 *     - goal_id
 *     - title
 *     - amount
 *     - date
 *     - category
 *   addMoney:
 *    type: object
 *    description: Podatki za dodajanje denarja k izbranemu cilju
 *    properties:
 *     title:
 *      type: string
 *      description: Ime cilja
 *     amount:
 *      type: number
 *      description: Vsoda dodana k prihrankom k cilju
 *    required:
 *     - title
 *     - amount
 *   deleteGoal:
 *    type: object
 *    description: Vsi podatki za brisanje cilja
 *    properties:
 *     goal_id:
 *      type: string
 *      description: ID cilja
 *    required:
 *     - goal_id
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