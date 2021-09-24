const mongoose = require('mongoose');
const Classfication = mongoose.model('Classfication');

//Create new classfication (POST)
const createClassfication = (req, res, next) => {
	const classfication = new Classfication(req.body);
	classfication.save()
        .then(classfication => {
            res.status(200).send(classfication.publicData());
        })
        .catch(next);
}

//Get all classfications by ID (GET)
const getClassfication = (req, res, next) => {
    if (req.params.id) {
		/* const paragraphString = toParagraphCase(req.params.id.toLowerCase());
        Classfication.find({ name: new RegExp(paragraphString) }) */ //Este código hace la búsqueda por similitud de nombre
		Classfication.find( { number: req.params.id } )
            .then(classfication => { 
                if(classfication) {
                    res.status(200).send(classfication.map(classfication => classfication.publicData()))
                } else {
                    res.status(404).send('Classfication not found');
                }
            })
            .catch(next)
    } else {
		const limit = req.body.limit; 
        const filter = req.body.filter;
		const fields = req.body.fields;
        Classfication.find(filter,fields)
			.limit(limit)
            .then(classfications => {
                res.send(classfications.map(classfication => classfication.publicData()))
            }).catch(next)
    }
}
//Modify classfication by ID (PUT)
const modifyClassfication = (req, res, next) => {
	Classfication.findOne({ number: req.params.id }) 
	.then(classfication => {
		if (!classfication) {
			return res.sendStatus(404);
		}
		const newInfoClassfication = req.body;
		if (newInfoClassfication.name) {
			classfication.name = newInfoClassifcation.name
		}
		
		classfication.save()
			.then(updated => {
				res.status(201).send(updated.publicData());
			})
			.catch(next);
	}).catch(next);
}

//Delete classfication by ID (DELETE)
const deleteClassfication = (req, res, next) => {
	Classfication.findOneAndDelete({ number : req.params.id })
	.then(deleteClassfication => {
		if(!deleteClassfication) {
			return res.status(404).send(`The classfication ${req.params.id} hasn't been found`);
		}
		res.status(200)
			.send(`The classfication ${req.params.name} has been deleted successfully`);
	})
	.catch(next);
}

//Count the number of registers of classfication in the DB (rute /count)
function countClassfication (req, res, next) {
    Classfication.aggregate([
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
	getClassfication,
	createClassfication,
	modifyClassfication,
	deleteClassfication,
	countClassfication
};