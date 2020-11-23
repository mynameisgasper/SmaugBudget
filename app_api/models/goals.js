const mongoose = require('mongoose');

const goalsSchema = new mongoose.Schema();
goalsSchema.add({
    name: {type: String, required: true},
    goal: {type: Number, required: true},
    moneyPut: {type: Number, required: false},
    date: {type: Date, required: true},
});

mongoose.model('Goals', goalsSchema, 'Goals');

module.exports = {
    goalsSchema: goalsSchema
}