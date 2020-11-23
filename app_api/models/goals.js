const mongoose = require('mongoose');
const goalsSchema = new mongoose.Schema();
goalsSchema.add({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    target: { type: Number, required: true },
    targetLeft: { type: Number, required: true },
    monthlyTarget: { type: Number, required: true },
    date: { type: Date, required: true },
    //  category: { type: categorySchema, required: true },
});

mongoose.model('Goals', goalsSchema, 'Goals');

module.exports = {
    goalsSchema: goalsSchema
}