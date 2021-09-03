const Type = require('../models/Type')

const createType = (req, res) => {
	const type = {...req.body};
	res.status(201).send(type);
}

const getType = (req, res) => {
	const type1 = new Type('Grass', 'https://cdn2.bulbagarden.net/upload/thumb/a/a8/Grass_icon_SwSh.png/96px-Grass_icon_SwSh.png');
	const type2 = new Type('Fire', 'https://cdn2.bulbagarden.net/upload/thumb/a/ab/Fire_icon_SwSh.png/96px-Fire_icon_SwSh.png');
	const type3 = new Type('Flying', 'https://cdn2.bulbagarden.net/upload/thumb/b/b5/Flying_icon_SwSh.png/96px-Flying_icon_SwSh.png');
  	res.status(200).send([type1, type2, type3]);
}

const modifyType = (req, res) => {
	let type = new Type('Grass', 'url antigua...');
	const modifications = req.body;
	type = { ...type, ...modifications };
	res.status(200).send(type);
}

const deleteType = (req, res) => {
	res.status(200).send(`The ${req.params.id} type has been deleted`);
}

module.exports = {
	getType,
	createType,
	modifyType,
	deleteType,
};