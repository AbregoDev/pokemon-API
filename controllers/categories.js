const Category = require('../models/Category')

function createCategory(req, res){
	let Category = new Category(req.body);
	res.status(200).send(Category);
}

function getCategory(req, res){
	let Category1 = new Category(1, 'Seed');
	let Category2 = new Category(2, 'Tiny Turtle');
	let Category3 = new Category(3, 'Turtle');
	let Category4 = new Category(4, 'Worm');
  	res.send([Category1, Category2, Category3, Category4]);
}

function modifyCategory(req, res){
	let Category = new Category(1, 'Seed');
	let modifications = req.body;
	Category = {...Category, ...modifications}
	res.send(Category);
}

function deleteCategory(req, res){
	res.status(200).send(`The category ${req.params.id} has been deleted`);
}

module.exports = {
	getCategory,
	createCategory,
	modifyCategory,
	deleteCategory,
}