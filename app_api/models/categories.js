const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema();
categorySchema.add({
    name: { type: String, required: true }
});

mongoose.model('category', categorySchema, 'category');

module.exports = {
    categorySchema: categorySchema
}