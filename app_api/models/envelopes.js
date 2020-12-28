const mongoose = require('mongoose');
const { categorySchema } = require('./categories')

/**
 * @swagger
 * components:
 *  schemas:
 *   getEnvelope:
 *    type: object
 *    description: Vsi podatki o kuverti
 *    properties:
 *     id:
 *      type: string
 *     progress:
 *      type: number
 *     budget:
 *      type: number
 *     spent:
 *      type: number
 *     color:
 *      type: string
 *     colorHex:
 *      type: string
 *     bgColor:
 *      type: string
 *     month:
 *      type: string
 *     category:
 *      type: object
 *      $ref: "#/components/schemas/Categories"
 *    required:
 *     - id
 *     - progress
 *     - budget
 *     - spent
 *     - color
 *     - colorHex
 *     - bgColor
 *     - month
 *     - category
 *   addEnvelope:
 *    type: object
 *    description: Podatki za dodajanje nove kuverte
 *    properties:
 *     category:
 *      type: string
 *     budget:
 *      type: number
 *     color:
 *      type: string
 *     month:
 *      type: string
 *    required:
 *     - category
 *     - value
 *     - budget
 *     - color
 *     - month
 *   editEnvelope:
 *    type: object
 *    description: Podatki za urejanje kuverte
 *    properties:
 *     id:
 *      type: string
 *     budget:
 *      type: number
 *    required:
 *     - id
 *     - budget
 *   deleteEnvelope:
 *    type: object
 *    description: Podatki za brisanje kuverte
 *    properties:
 *     id:
 *      type: string
 *    required:
 *     - id
 */

const envelopesSchema = new mongoose.Schema();
envelopesSchema.add({
    progress: { type: Number, required: true },
    budget: { type: Number, required: true },
    spent: { type: Number, required: true },
    color: { type: String, required: true },
    colorHex: { type: String, required: true },
    bgColor: { type: String, required: true },
    month: { type: String, required: true },
    category: { type: categorySchema, required: true }
});

mongoose.model('Envelopes', envelopesSchema, 'Envelopes');

module.exports = {
    envelopesSchema: envelopesSchema
}