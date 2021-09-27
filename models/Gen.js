const mongoose = require('mongoose');

const GenSchema = new mongoose.Schema({
    genNumber: { type: Number },
    name: { type: String },
}, { collection: 'Gen' });

GenSchema.methods.publicData = function () {
    return {
        genNumber: this.genNumber,
        name: this.name,
    };
}

mongoose.model('Gen', GenSchema);