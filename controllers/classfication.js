// TODO: Cambiar nombre a "classfication" en todos lados
const mongoose = require('mongoose');
const Classfication = mongoose.model('Classfication');

const createClassfication = (req, res, next) => {
	const classfication = new Classfication(req.body);
	classfication.save()
        .then(classfication => {
            res.status(200).send(classfication.publicData());
        })
        .catch(next);
}

const getClassfication = (req, res, next) => {
    if (req.params.id) {
		const paragraphString = toParagraphCase(req.params.id.toLowerCase());
        Classfication.find({ name: new RegExp(paragraphString) })
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
        const filter = req.body.filter; //Creo que este filtro esta de mas, para verificar
        Classfication.find(filter)
			.limit(limit)
            .then(classfications => {
                res.send(classfications.map(classfication => classfication.publicData()))
            }).catch(next)
    }
}

const modifyClassfication = (req, res, next) => {
	Classfication.findOne({ name: req.params.id }) //Revisar que tan util seria agregar la busqueda por expresion regular (Like)
	.then(classfication => {
		if (!classfication) {
			return res.sendStatus(404);
		}
		const nuevaInfoCategoria = req.body;
		if (nuevaInfoCategoria.name) {
			classfication.name = nuevaInfoCategoria.name
		}
		
		classfication.save()
			.then(updated => {
				res.status(201).send(updated.publicData());
			})
			.catch(next);
	}).catch(next);
}

const deleteClassfication = (req, res, next) => {
	Classfication.findOneAndDelete({ name: req.params.id })
	.then(deleteClassfication => {
		if(!deleteClassfication) {
			return res.status(404).send(`The classfication ${req.params.id} hasn't been found`);
		}
		res.status(200)
			.send(`The classfication ${req.params.id} has been deleted successfully`);
	})
	.catch(next);
}

function countClassfication (req, res, next) {
    Classfication.aggregate([
            {'$count' : 'total'}
    ]).then(r => {
        res.status(200).send(r[0])
    }).catch(next)
}
const toParagraphCase = (string) => {
    return string[0].toUpperCase() + string.slice(1);
}
module.exports = {
	getClassfication,
	createClassfication,
	modifyClassfication,
	deleteClassfication,
	countClassfication
};