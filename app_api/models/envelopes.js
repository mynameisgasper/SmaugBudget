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
 *      description: Id kuverte
 *     progress:
 *      type: number
 *      description: V procentih podana količina zapravljenega denarja od proračuna
 *     budget:
 *      type: number
 *      description: Proračun za določeno kuverto/kategorijo
 *     spent:
 *      type: number
 *      description: Vsota denarja zapravljenega za določeno kuverto/kategorijo
 *     color:
 *      type: string
 *      description: Barva kuverte RGB
 *     colorHex:
 *      type: string
 *      description: Barva kuverte HEX
 *     bgColor:
 *      type: string
 *      description: Barva kuverte v ozadju
 *     month:
 *      type: string
 *      description: Mesec za katerega velja ta kuverta
 *     category:
 *      type: object
 *      description: Kategorija kamor spada kuverta
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
 *     categoryAddEnvelope:
 *      type: string
 *      description: Kategorija kamor spada kuverta
 *     inputAmount:
 *      type: number
 *      description: Proračun za dano kuverto
 *     colorPicker:
 *      type: string
 *      description: Barva za dano kuverto
 *     month:
 *      type: string
 *      description: Mesec za katerega velja ta kuverta
 *    required:
 *     - categoryAddEnvelope
 *     - inputAmount
 *     - colorPicker
 *     - month
 *   editEnvelope:
 *    type: object
 *    description: Podatki za urejanje kuverte
 *    properties:
 *     id:
 *      type: string
 *      description: ID kuverte
 *     inputAmount:
 *      type: number
 *      description: Proračun za dano kuverto
 *    required:
 *     - id
 *     - inputAmount
 *   deleteEnvelope:
 *    type: object
 *    description: Podatki za brisanje kuverte
 *    properties:
 *     envelope_id:
 *      type: string
 *      description: ID kuverte
 *    required:
 *     - envelope_id
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