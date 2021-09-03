const Gen = require('../models/Gen')

const createGen = (req, res) => {
	const gen = {...req.body};
	res.status(201).send(gen);
}

const getGen = (req, res) => {
	const gen1 = new Gen(1, 'Kanto', 'url1');
	const gen2 = new Gen(2, 'Johto', 'url2');
	const gen3 = new Gen(3, 'Hoenn', 'url3');
  	res.status(200).send([gen1, gen2, gen3]);
}

const modifyGen = (req, res) => {
	let gen = new Gen(1, 'Kanto', 'url1');
	const modifications = req.body;
	gen = {...gen, ...modifications}
	res.status(200).send(gen);
}

const deleteGen = (req, res) => {
	res.status(200).send(`The generation with id ${req.params.id} has been deleted`);
}

module.exports = {
	getGen,
	createGen,
	modifyGen,
	deleteGen,
};