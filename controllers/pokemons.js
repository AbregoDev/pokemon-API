const Pokemon = require('../models/Pokemon')

const createPokemon = (req, res) => {
	const pokemon = {...req.body};
	res.status(201).send(pokemon);
}

const getPokemon = (req, res) => {
	const pokemon1 = new Pokemon(1,'Bulbasaur','https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png', '1', ['Grass', 'Poison'], 'Seed', ['Fire', 'Flying', 'Psychic', 'Ice']);
	const pokemon2 = new Pokemon(2,'Ivysaur','https://assets.pokemon.com/assets/cms2/img/pokedex/full/002.png', '1', ['Grass', 'Poison'], 'Seed', ['Fire', 'Flying', 'Psychic', 'Ice']);
	const pokemon3 = new Pokemon(3,'Venusaur','https://assets.pokemon.com/assets/cms2/img/pokedex/full/003.png', '1', ['Grass', 'Poison'], 'Seed', ['Fire', 'Flying', 'Psychic', 'Ice']);
  	res.status(200).send([pokemon1, pokemon2, pokemon3]);
}

const modifyPokemon = (req, res) => {
	let pokemon = new Pokemon(1,'Bulbasaur','https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png', '1', ['Grass', 'Poison'], 'Seed', ['Fire', 'Flying', 'Psychic', 'Ice']);
	const modifications = req.body;
	pokemon = { ...pokemon, ...modifications };
	res.status(200).send(pokemon);
}

const deletePokemon = (req, res) => {
	res.status(200).send(`The Pokémon number ${req.params.id} has been deleted`);
}

module.exports = {
	getPokemon,
	createPokemon,
	modifyPokemon,
	deletePokemon,
};