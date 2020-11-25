const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema();
categorySchema.add({
    name: { type: String, required: true }
});

mongoose.model('Categories', categorySchema, 'Categories');

module.exports = {
    categorySchema: categorySchema
}