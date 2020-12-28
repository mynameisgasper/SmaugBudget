const mongoose = require('mongoose');
const { categorySchema } = require('./categories')

/**
 * @swagger
 * components:
 *  schemas:
 *   addEnvelope:
 *    type: object
 *    properties:
 *     category:
 *      type: string
 *     budget:
 *      type: Number
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
 *    properties:
 *     id:
 *      type: string
 *     budget:
 *      type: Number
 *    required:
 *     - id
 *     - budget
 *   deleteEnvelope:
 *    type: object
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