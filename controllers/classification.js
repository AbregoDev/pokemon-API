const mongoose = require('mongoose');
const Classification = mongoose.model('Classification');

//Create new classification (POST)
const createClassification = (req, res, next) => {
	const classification = new Classification(req.body);
	classification.save()
        .then(classification => {
            res.status(200).send(classification.publicData());
        })
        .catch(next);
}

//Get all classifications by ID (GET)
const getClassification = (req, res, next) => {
    if (req.params.id) {
		/* const paragraphString = toParagraphCase(req.params.id.toLowerCase());
        Classification.find({ name: new RegExp(paragraphString) }) */ //Este código hace la búsqueda por similitud de nombre
		Classification.find( { number: req.params.id } )
            .then(classification => { 
                if(classification) {
                    res.status(200).send(classification.map(classification => classification.publicData()))
                } else {
                    res.status(404).send('Classification not found');
                }
            })
            .catch(next)
    } else {
		const limit = req.body.limit; 
        const filter = req.body.filter;
		const fields = req.body.fields;
        Classification.find(filter,fields)
			.limit(limit)
            .then(classifications => {
                res.send(classifications.map(classification => classification.publicData()))
            }).catch(next)
    }
}
//Modify classification by ID (PUT)
const modifyClassification = (req, res, next) => {
	console.log(" -------------------------PUT -------------------")
	Classification.findOne({ number: req.params.id }) 
	.then(classification => {
		if (!classification) {
			return res.sendStatus(404);
		}
		const newInfoClassification = req.body;
		if (newInfoClassification.name) {
			classification.name = newInfoClassification.name
		}
		
		classification.save()
			.then(updated => {
				res.status(201).send(updated.publicData());
			})
			.catch(next);
	}).catch(next);
}

//Delete classification by ID (DELETE)
const deleteClassification = (req, res, next) => {
	Classification.findOneAndDelete({ number : req.params.id })
	.then(deleteClassification => {
		if(!deleteClassification) {
			return res.status(404).send(`The classification ${req.params.id} hasn't been found`);
		}
		res.status(200)
			.send(`The classification ${req.params.name} has been deleted successfully`);
	})
	.catch(next);
}

//Count the number of registers of classification in the DB (rute /count)
function countClassification (req, res, next) {
    Classification.aggregate([
            {'$count' : 'total'}
    ]).then(r => {
        res.status(200).send(r[0])
    }).catch(next)
}
/* const toParagraphCase = (string) => {
    return string[0].toUpperCase() + string.slice(1);
} */  //Esta función convierte la primer letra de un string a mayúscula en caso de ser necesario para el servicio (GET)

//Export services to define rutes
module.exports = {
	getClassification,
	createClassification,
	modifyClassification,
	deleteClassification,
	countClassification
};