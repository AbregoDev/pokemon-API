// TODO: Reemplazar los espacios por guiones bajos en name
const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: { type: String },
}, { collection: 'Category' });

CategorySchema.methods.publicData = function () {
    return {
        name: this.name,
    };
}

mongoose.model('Category', CategorySchema);