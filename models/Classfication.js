const mongoose = require('mongoose');

const ClassficationSchema = new mongoose.Schema({
    name: { type: String },
}, { collection: 'Classfication' });

ClassficationSchema.methods.publicData = function () {
    return {
        name: this.name,
    };
}

mongoose.model('Classfication', ClassficationSchema);