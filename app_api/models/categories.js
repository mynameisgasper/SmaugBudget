const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema();
categorySchema.add({
    name: { type: String, required: true },
    color: { type: String, required: true, default: 'rgb(47, 201, 30)' }
});

mongoose.model('Categories', categorySchema, 'Categories');

module.exports = {
    categorySchema: categorySchema
}