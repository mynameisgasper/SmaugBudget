const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema();
categorySchema.add({
    id: { type: Number, required: true },
    name: { type: String, required: true}
});

mongoose.model('category', categorySchema, 'category');

module.exports = {
    categorySchema: categorySchema
}