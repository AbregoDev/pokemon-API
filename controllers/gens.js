const Gen = require('../models/Gen')

function createGen(req, res) {
	let Gen = new Gen(req.body);
	res.status(200).send(Gen);
}

function getGen(req, res) {
	let Gen1 = new Gen(1, 'Kanto', '');
	let Gen2 = new Gen(2, 'Johto', '');
	let Gen3 = new Gen(3, 'Hoenn', '');
  	res.send([Gen1, Gen2, Gen3]);
}

function modifyGen(req, res) {
	let Gen = new Gen(1, 'Kanto', '');
	let modifications = req.body;
	Gen = {...Gen, ...modifications}
	res.send(Gen);
}

function deleteGen(req, res) {
	res.status(200).send(`The ${req.params.name} Gen has been deleted`);
}

module.exports = {
	getGen,
	createGen,
	modifyGen,
	deleteGen,
}