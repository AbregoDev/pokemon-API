const Category = require('../models/Category');

const createCategory = (req, res) => {
	const category = {...req.body};
	res.status(201).send(category);
}

const getCategory = (req, res) => {
	const category1 = new Category(1, 'Seed');
	const category2 = new Category(2, 'Tiny Turtle');
	const category3 = new Category(3, 'Turtle');
	const category4 = new Category(4, 'Worm');
  	res.status(200).send([category1, category2, category3, category4]);
}

const modifyCategory = (req, res) => {
	let category = new Category(1, 'Seed');
	const modifications = req.body;
	category = { ...category, ...modifications }
	res.status(200).send(category);
}

const deleteCategory = (req, res) => {
	res.status(200).send(`The category ${req.params.id} has been deleted`);
}

module.exports = {
	getCategory,
	createCategory,
	modifyCategory,
	deleteCategory,
};