const mongoose = require('mongoose');
const Classfication = mongoose.model('Classfication');

//Servicio de creación de nueva clasificación (POST)
const createClassfication = (req, res, next) => {
	const classfication = new Classfication(req.body);
	classfication.save()
        .then(classfication => {
            res.status(200).send(classfication.publicData());
        })
        .catch(next);
}

//Servicio que obtiene todas las clasificaciones y por Id (GET)
const getClassfication = (req, res, next) => {
    if (req.params.id) {
		/* const paragraphString = toParagraphCase(req.params.id.toLowerCase());
        Classfication.find({ name: new RegExp(paragraphString) }) */ //Este código hace la búsqueda por similitud de nombre
		Classfication.find( { number: req.params.id } )
            .then(classfication => { 
                if(classfication) {
                    res.status(200).send(classfication.map(classfication => classfication.publicData()))
                } else {
                    res.status(404).send('No se ha encontrado');
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
//Servicio que modifica por id solamente el nombre de la clasificación (PUT)
const modifyClassfication = (req, res, next) => {
	Classfication.findOne({ number: req.params.id }) 
	.then(classfication => {
		if (!classfication) {
			return res.sendStatus(404);
		}
		const nuevaInfoClasificacion = req.body;
		if (nuevaInfoClasificacion.name) {
			classfication.name = nuevaInfoClasificacion.name
		}
		
		classfication.save()
			.then(updated => {
				res.status(201).send(updated.publicData());
			})
			.catch(next);
	}).catch(next);
}

//Servicio que borra por id numero (DELETE)
const deleteClassfication = (req, res, next) => {
	Classfication.findOneAndDelete({ number : req.params.id })
	.then(deleteClassfication => {
		if(!deleteClassfication) {
			return res.status(404).send(`The classfication ${req.params.id} hasn't been found`);
		}
		res.status(200)
			.send(`The classfication ${req.params.id} has been deleted successfully`);
	})
	.catch(next);
}

//Servicio que cuenta el número de clasificaciones disponibles en la base de datos (Ruta /count)
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

//Se exportan los servicios para definir sus rutas
module.exports = {
	getClassfication,
	createClassfication,
	modifyClassfication,
	deleteClassfication,
	countClassfication
};