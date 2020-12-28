const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *  schemas:
 *   Categories:
 *    type: object
 *    description: Vsi podatki o kategoriji
 *    properties:
 *     name:
 *      type: string
 *     color:
 *      type: string
 *     basic:
 *      type: boolean
 *    required:
 *     - name
 *     - color
 *     - basic
 */

const categorySchema = new mongoose.Schema();

categorySchema.add({
    name: { type: String, required: true },
    color: { type: String, required: true, default: 'rgb(47, 201, 30)' },
    basic: { type: Boolean, required: true, default: false }
});

mongoose.model('Categories', categorySchema, 'Categories');

module.exports = {
    categorySchema: categorySchema
}