const mongoose = require('mongoose');
const goalsSchema = new mongoose.Schema();
cardSchema.add({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    color: { type: String, required: true },
    count: { type: Number, required: true },
    icon: { type: String, required: true }
});

mongoose.model('Cards', cardSchema, 'Cards');

module.exports = {
    cardSchema: cardSchema
}