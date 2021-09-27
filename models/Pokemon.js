const mongoose = require("mongoose");

const PokemonSchema = new mongoose.Schema({
    pokedexNumber: { type: Number, required: true },
    name: { type: String, required: true },
    classification: { type: String, required: true },
    gen: { type: Number },
    imageUrl: { type: String },
    types: [String],
    abilities: [String],
}, { collection: 'Pokemon' });

PokemonSchema.methods.publicData = function () { //No cambiar a arrow por que se rompe xD
    return {
        pokedexNumber: this.pokedexNumber,
        name: this.name,
        classification: this.classification,
        gen: this.gen,
        imageUrl: this.imageUrl,
        types: this.types,
        abilities: this.abilities,
    };
};

mongoose.model('Pokemon', PokemonSchema)