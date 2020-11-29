const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema();

friendSchema.add({
    name: {  type: String, required: true },
    balance: { type: Number, required: true }
});

mongoose.model('Friend', friendSchema, 'Friend');

module.exports = {
    friendSchema: friendSchema
}