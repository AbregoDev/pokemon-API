const Type = require('../models/Type')

function createType(req, res) {
	let Type = new Type(req.body);
	res.status(200).send(Type);
}

function getType(req, res) {
	let Type1 = new Type('Grass', 'https://cdn2.bulbagarden.net/upload/thumb/a/a8/Grass_icon_SwSh.png/96px-Grass_icon_SwSh.png');
	let Type3 = new Type('Fire', 'https://cdn2.bulbagarden.net/upload/thumb/a/ab/Fire_icon_SwSh.png/96px-Fire_icon_SwSh.png');
	let Type4 = new Type('Flying', 'https://cdn2.bulbagarden.net/upload/thumb/b/b5/Flying_icon_SwSh.png/96px-Flying_icon_SwSh.png');
  	res.send([Type1, Type3, Type4]);
}

function modifyType(req, res) {
	let Type = new Type('Grass', '');
	let modifications = req.body;
	Type = {...Type, ...modifications}
	res.send(Type);
}

function deleteType(req, res) {
	res.status(200).send(`The ${req.params.name} Type has been deleted`);
}

module.exports = {
	getType,
	createType,
	modifyType,
	deleteType,
}