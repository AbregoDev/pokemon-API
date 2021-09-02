const Pokemon = require('../models/Pokemon')

function createPokemon(req, res){
	let Pokemon = new Pokemon(req.body);
	res.status(200).send(Pokemon);
}

function getPokemon(req, res){
	let Pokemon1 = new Pokemon(1,'Bulbasaur','https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png', '1', ['Grass', 'Poison'], 'Seed', ['Fire', 'Flying', 'Psychic', 'Ice']);
	let Pokemon2 = new Pokemon(2,'Ivysaur','https://assets.pokemon.com/assets/cms2/img/pokedex/full/002.png', '1', ['Grass', 'Poison'], 'Seed', ['Fire', 'Flying', 'Psychic', 'Ice']);
	let Pokemon3 = new Pokemon(3,'Venusaur','https://assets.pokemon.com/assets/cms2/img/pokedex/full/003.png', '1', ['Grass', 'Poison'], 'Seed', ['Fire', 'Flying', 'Psychic', 'Ice']);
  	res.send([Pokemon1, Pokemon2, Pokemon3]);
}

function modifyPokemon(req, res){
	let Pokemon = new Pokemon(1,'Bulbasaur','https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png', '1', ['Grass', 'Poison'], 'Seed', ['Fire', 'Flying', 'Psychic', 'Ice']);
	let modifications = req.body;
	Pokemon = {...Pokemon, ...modifications}
	res.send(Pokemon);
}

function deletePokemon(req, res){
	res.status(200).send(`The Pokémon number ${req.params.id} has been deleted`);
}

module.exports = {
	getPokemon,
	createPokemon,
	modifyPokemon,
	deletePokemon,
}