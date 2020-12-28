const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *  schemas:
 *   Friend:
 *    type: object
 *    properties:
 *     name:
 *      type: string
 *     balance:
 *      type: number
 *    required:
 *     - name
 *     - balance
 */

const friendSchema = new mongoose.Schema();

friendSchema.add({
    name: {  type: String, required: true },
    balance: { type: Number, required: true }
});

mongoose.model('Friend', friendSchema, 'Friend');

module.exports = {
    friendSchema: friendSchema
}