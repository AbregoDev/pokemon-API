const mongoose = require('mongoose');

const ClassificationSchema = new mongoose.Schema({
    number: { type: Number },
    name: { type: String }
}, { collection: 'Classification' });

ClassificationSchema.methods.publicData = function () {
    return {
        number: this.number,
        name: this.name
    };
}

mongoose.model('Classification', ClassificationSchema);