const mongoose = require('mongoose');

const ClassficationSchema = new mongoose.Schema({
    number: { type: Number },
    name: { type: String }
}, { collection: 'Classfication' });

ClassficationSchema.methods.publicData = function () {
    return {
        number: this.number,
        name: this.name
    };
}

mongoose.model('Classfication', ClassficationSchema);