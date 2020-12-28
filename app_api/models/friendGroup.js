const mongoose = require('mongoose');
const { friendSchema } = require('./friend');

const friendGroupSchema = new mongoose.Schema();

/**
 * @swagger
 * components:
 *  schemas:
 *   getFriendGroup:
 *    type: object
 *    description: Vsi podatki o skupini
 *    properties:
 *     name:
 *      type: string
 *     balance:
 *      type: number
 *     friends:
 *      type: object
 *      $ref: "#/components/schemas/Friend"
 *    required:
 *     - name
 *     - balance
 */

friendGroupSchema.add({
    name: {  type: String, required: true },
    balance: {  type: Number, required: true },
    friends: [friendSchema]
});

mongoose.model('FriendGroup', friendGroupSchema, 'FriendGroup');

module.exports = {
    friendGroupSchema: friendGroupSchema
}