const mongoose = require('mongoose');
const { friendSchema } = require('./friendSchema');

const friendGroupSchema = new mongoose.Schema();

friendGroupSchema.add({
    friend:[friendSchema]
});

mongoose.model('FriendGroup', friendGroupSchema, 'FriendGroup');

module.exports = {
    friendGroupSchema: friendGroupSchema
}