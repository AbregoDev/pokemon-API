const mongoose = require('mongoose');

const TypeSchema = new mongoose.Schema({
    number: { type: Number},
    type: { type: String },
    imageUrl: { type: String },
}, { collection: 'Type' });

TypeSchema.methods.publicData = function () {
    return {
        number: this.number,
        type: this.type,
        imageUrl: this.imageUrl,
    };
}

mongoose.model('Type', TypeSchema);