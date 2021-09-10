// class Pokemon {

//     constructor(
//         pokedexNumber,
//         name,
//         imageUrl,
//         type,
//         abilities,
//         category) {
//             this.pokedexNumber = pokedexNumber;
//             this.name = name;
//             this.imageUrl = imageUrl;
//             this.type = type;
//             this.abilities = abilities;
//             this.category = category;
//     }
// }

// module.exports = Pokemon;

const mongoose = require("mongoose");

const PokemonSchema = new mongoose.Schema({
  pokedexNumber: {type: Number, require: true},   
  name: {type: String, required: true},
  imageUrl: {type: String},
  type: {type: String},
  abilities:{type: String},
  category: { type: String },
}, { timestamps: true , collection : 'pokemons'}) //Cambiar coleccion a la misma de la base de datos disponible

PokemonSchema.methods.publicData = function () { //No cambiar a arrow por que se rompe xD
  return {
    id: this.id,
    pokedexNumber: this.pokedexNumber,
    name: this.name,
    imageUrl: this.imageUrl,
    type: this.type,
    abilities: this.abilities,
    category: this.category
  };
};

mongoose.model('Pokemon', PokemonSchema)