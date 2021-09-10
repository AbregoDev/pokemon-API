const mongoose = require('mongoose')
const Pokemon = mongoose.model("Pokemon")

const createPokemon = (req, res, next) => {
	let pokemon = new 	Pokemon(req.body);
	pokemon.save().then(pok =>{
		res.status(200).send(pok)
	}).catch(next)
}

function getPokemon (req, res, next) {
	if (req.params.id){
		Pokemon.findById(req.params.id)
		.then(pok => {res.send(pok)})
		.catch(next)
	} else {
		Pokemon.find()
		.then(pokemons => {res.send(pokemons)})
		.catch(next)
	}
}

const modifyPokemon = (req, res, next) => {
	Pokemon.findById(req.params.id)
	.then(pokemon =>{
		if(!pokemon){ 
			return res.sendStatus(401)
		}
		let nuevaInfo = req.body

		if (typeof nuevaInfo.pokedexNumber !== "undefined") {
			pokemon.pokedexNumber = nuevaInfo.pokedexNumber
		}
		if (typeof nuevaInfo.name !== "undefined") {
			pokemon.name = nuevaInfo.name
		}
		if (typeof nuevaInfo.imageUrl !== 'undefined'){
			pokemon.imageUrl = nuevaInfo.imageUrl
		}
		if (typeof nuevaInfo.type !== 'undefined'){
			pokemon.type = nuevaInfo.type
		}
		if (typeof nuevaInfo.abilities !== 'undefined'){
			pokemon.abilities = nuevaInfo.abilities
		}
		if (typeof nuevaInfo.category !== 'undefined'){
			pokemon.category = nuevaInfo.category
		}
		pokemon.save().then(updated => {
			res.status(201).json(updated.publicData())
		}).catch(next)
	}).catch(next)
}

const deletePokemon = (req, res, next) => {
	Pokemon.findOneAndDelete({_id: req.params.id})
	.then(r => {res.status(200).send(`The Pokémon with id ${req.params.id} has been deleted successfully`)})
	.catch(next)
}

module.exports = {
	getPokemon,
	createPokemon,
	modifyPokemon,
	deletePokemon,
};