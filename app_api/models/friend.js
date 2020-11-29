const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema();

friendSchema.add({
    name: {  type: String, required: true },
    balance: { type: Number, required: true }
});

mongoose.model('Friend', friendGroupSchema, 'Friend');

module.exports = {
    friendSchema: friendSchema
}