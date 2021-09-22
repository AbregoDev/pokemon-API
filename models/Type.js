const mongoose = require('mongoose');

const TypeSchema = new mongoose.Schema({
    type: { type: String },
    imageUrl: { type: String },
}, { collection: 'Type' });

TypeSchema.methods.publicData = function () {
    return {
        type: this.type,
        imageUrl: this.imageUrl,
    };
}

mongoose.model('Type', TypeSchema);