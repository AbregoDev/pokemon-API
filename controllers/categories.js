const mongoose = require('mongoose');
const Category = mongoose.model('Category');

const createCategory = (req, res, next) => {
	const category = new Category(req.body);
	category.save()
        .then(category => {
            res.status(200).send(category.publicData());
        })
        .catch(next);
}

const getCategory = (req, res, next) => {
    if (req.params.id) {
        Category.findOne({ name: req.params.id})
            .then(cat => { 
                if(cat) {
                    res.status(200).send(cat.publicData());
                } else {
                    res.status(404).send('No se ha encontrado');
                }
            })
            .catch(next)
    } else {
        Category.find()
            .then(categories => {
                res.send(categories.map(category => category.publicData()))
            }).catch(next)
    }
}

const modifyCategory = (req, res, next) => {
	Category.findOne({ name: req.params.id })
	.then(cat => {
		if (!cat) {
			return res.sendStatus(404);
		}
		const nuevaInfoCategoria = req.body;
		if (nuevaInfoCategoria.name) {
			cat.name = nuevaInfoCategoria.name
		}
		
		cat.save()
			.then(updated => {
				res.status(201).send(updated.publicData());
			})
			.catch(next);
	}).catch(next);
}

const deleteCategory = (req, res, next) => {
	Category.findOneAndDelete({ name: req.params.id })
	.then(r => {
        // TODO: Verificar que elimine algo
		res.status(200)
			.send(`The category with name ${req.params.id} has been deleted successfully`);
	})
	.catch(next);
}

function countCategory (req, res, next) {
    Category.aggregate([
            {'$count' : 'total'}
    ]).then(r => {
        res.status(200).send(r)
    }).catch(next)
}
module.exports = {
	getCategory,
	createCategory,
	modifyCategory,
	deleteCategory,
	countCategory
};