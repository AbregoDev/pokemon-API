const mongoose = require('mongoose')
const Pokemon = mongoose.model("Pokemon")

//Create new pokemon (POST)
const createPokemon = (req, res, next) => {
    const pokemon = new Pokemon(req.body);
    pokemon.save()
        .then(pok => {
            res.status(200).send(pok.publicData())
        })
        .catch(next);
}

//Get all pokemon by ID (GET)
const getPokemon = (req, res, next) => {
    if (req.params.id) {
        const fields = req.body.fields;

        Pokemon.findOne({ pokedexNumber: req.params.id}, fields)
            .then(pokemon => { 
                res.setHeader('Access-Control-Allow-Origin', '*');

                if(pokemon) {
                    res.status(200).send(pokemon.publicData());
                } else {
                    res.status(404).send('Pokemon not found');
                }
            })
            .catch(next);
    } else {
        const limit = req.body.limit;
        const filter = req.body.filter;
        const fields = req.body.fields;

        Pokemon.find(filter, fields)
            .limit(limit)
            .then(pokemons => {
                res.send(pokemons.map(pokemon => pokemon.publicData()));
            }).catch(next);
    }
}

//Count the number of registers of pokemon in the DB (rute /count)
const countPokemon = (req, res, next) => {
    Pokemon.countDocuments({}, function (err, count) {
        if(err) {
            res.send({ err });
            next();
        } else {
            res.send({ count });
        }
    });
}

//Modify pokemon by ID (PUT)
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
                    res.status(201).send(updated.publicData());
                })
                .catch(next);
        }).catch(next)
}

//Delete pokemon bby ID (DELETE)
const deletePokemon = (req, res, next) => {
    Pokemon.findOneAndDelete({ pokedexNumber: req.params.id })
        .then(deletedPokemon => {
            if(!deletedPokemon) {
                return res.status(404).send(`Pokémon with number ${req.params.id} hasn't been found`);
            }
            
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
    countPokemon,
};