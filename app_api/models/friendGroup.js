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
 *     - friends
 *   addFriendGroup:
 *    type: object
 *    description: Podatki za kreiranje nove skupine
 *    properties:
 *     name:
 *      type: string
 *      description: Ime nove skupine
 *     friends:
 *      type: string
 *      description: Podatki o prijateljih
 *      $ref: "#/components/schemas/Friend"
 *    required:
 *     - name
 *     - friends
 *   deleteFriendGroup:
 *    type: object
 *    description: Podatki za brisanje skupine
 *    properties:
 *     group_id:
 *      type: string
 *      description: ID skupino k jo želimo izbrisati
 *    required:
 *     - group_id
 *   calculateBalances:
 *    type: object
 *    description: Podatki urejanje podatkov skupine
 *    properties:
 *     group_id:
 *      type: string
 *      description: ID skupine, ki jo bomo spreminjali
 *     friends:
 *      type: string
 *      description: Novi podatki o prijateljih
 *      $ref: "#/components/schemas/Friend"
 *     required:
 *      - group_id
 *      - friends
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