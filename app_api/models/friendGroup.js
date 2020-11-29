const mongoose = require('mongoose');
const { friendSchema } = require('./friend');

const friendGroupSchema = new mongoose.Schema();

friendGroupSchema.add({
    name: {  type: String, required: true },
    friends: [friendSchema]
});

mongoose.model('FriendGroup', friendGroupSchema, 'FriendGroup');

module.exports = {
    friendGroupSchema: friendGroupSchema
}