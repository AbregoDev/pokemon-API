const mongoose = require('mongoose');

const GenSchema = new mongoose.Schema({
    number: { type: Number },
    name: { type: String },
}, { collection: 'Gen' });

GenSchema.methods.publicData = function () {
    return {
        number: this.number,
        name: this.name,
    };
}

mongoose.model('Gen', GenSchema);