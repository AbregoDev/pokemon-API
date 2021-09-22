const mongoose = require('mongoose');
const Type = mongoose.model('Type')

const getType = (req, res, next) => {
	if (req.params.id) {
        const paragraphString = toParagraphCase(req.params.id.toLowerCase());
        Type.findOne({ type: paragraphString })
            .then(type => { 
                if(type) {
					console.log(type);
                    res.status(200).send(type.publicData());
                } else {
                    res.status(404).send('No se ha encontrado');
                }
            })
            .catch(next);
    } else {
        Type.find()
            .then(types => {
                res.send(types.map(type => type.publicData()));
            }).catch(next);
    }
}

const createType = (req, res, next) => {
	const type = new Type(req.body);
	type.save()
        .then(type => {
            res.status(200).send(type.publicData());
        })
        .catch(next);
}

const modifyType = (req, res, next) => {
	Type.findOne({type: req.params.type})
	.then(type => {
		if(!type){
			return res.sendStatus(404);
		}
		const nuevaInfo = req.body;
		if (nuevaInfo.type){
			type.type = nuevaInfo.type;
		}
		if (nuevaInfo.imageUrl){
			type.imageUrl = nuevaInfo.imageUrl;
		}
		type.save()
			.then(updated => {
				res.status(201).send(updated.publicData());
			})
			.catch(next);
	})
	.catch(next);
}


const deleteType = (req, res, next) => {
	Type.findOne({type: req.params.type})
	.then(del => {
        // TODO: Verificar que elimine algo
		res.status(200)
		.send(`The Type with name ${req.params.type} has been deleted successfully`);
	})
	.catch(next);
}

const countType = (req, res, next) => {
    Type.aggregate([
        {'$count' : 'total'}
    ]).then(r => {
    res.status(200).send(r[0])
    }).catch(next)
}

const toParagraphCase = (string) => {
    return string[0].toUpperCase() + string.slice(1);
}

module.exports = {
	getType,
	createType,
	modifyType,
	deleteType,
	countType,
};