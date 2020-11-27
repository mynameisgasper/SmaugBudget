const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema();
categorySchema.add({
    name: { type: String, required: true },
    color: { type: String, required: true, default: 'rgb(47, 201, 30)' },
    basic: { type: Boolean, required: true, default: false }
});

mongoose.model('Categories', categorySchema, 'Categories');

module.exports = {
    categorySchema: categorySchema
}