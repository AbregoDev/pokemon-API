const mongoose = require('mongoose')
const Pokemon = mongoose.model("Pokemon")

const createPokemon = (req, res, next) => {
    const pokemon = new Pokemon(req.body);
    pokemon.save()
    .then(pok => {
        res.status(200).send(pok)
    })
    .catch(next);
}

function getPokemon(req, res, next) {
    if (req.params.id) {
        Pokemon.findOne({ pokedexNumber: req.params.id})
            .then(pok => { 
                if(pok) {
                    res.status(200).send(pok);
                } else {
                    res.status(404).send('No se ha encontrado');
                }
            })
            .catch(next)
    } else {
        Pokemon.find()
            .then(pokemons => {
                res.send(pokemons)
            }).catch(next)
    }
}

const modifyPokemon = (req, res, next) => {
    Pokemon.findOne({ pokedexNumber: req.params.id })
        .then(pokemon => {
            if (!pokemon) {
                return res.sendStatus(404);
            }
            
            const nuevaInfo = req.body;

            if (nuevaInfo.pokedexNumber) {
                pokemon.pokedexNumber = nuevaInfo.pokedexNumber
            }
            if (nuevaInfo.name) {
                pokemon.name = nuevaInfo.name
            }
            if (nuevaInfo.gen) {
                pokemon.gen = nuevaInfo.gen
            }
            if (nuevaInfo.imageUrl) {
                pokemon.imageUrl = nuevaInfo.imageUrl
            }
            if (nuevaInfo.types) {
                pokemon.types = nuevaInfo.types
            }
            if (nuevaInfo.abilities) {
                pokemon.abilities = nuevaInfo.abilities
            }
            if (nuevaInfo.category) {
                pokemon.category = nuevaInfo.category
            }
            
            pokemon.save()
                .then(updated => {
                    res.status(201).json(updated.publicData());
                })
                .catch(next);
        }).catch(next)
}

const deletePokemon = (req, res, next) => {
    Pokemon.findOneAndDelete({ pokedexNumber: req.params.id })
        .then(r => {
            res.status(200)
                .send(`The Pokémon with Pokedex id ${req.params.id} has been deleted successfully`);
        })
        .catch(next);
}

module.exports = {
    getPokemon,
    createPokemon,
    modifyPokemon,
    deletePokemon,
};