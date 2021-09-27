const mongoose = require('mongoose');
const Type = mongoose.model('Type')

//Create new type (POST)
const createType = (req, res, next) => {
	const type = new Type(req.body);
	type.save()
        .then(type => {
            res.status(200).send(type.publicData());
        })
        .catch(next);
}


//Get all types by ID (GET)
const getType = (req, res, next) => {
	if (req.params.id) {
        const fields = req.body.fields;
        Type.findOne({ number: req.params.id}, fields)
            .then(type => { 
                if(type) {
                    res.status(200).send(type.publicData());
                } else {
                    res.status(404).send('Type not found');
                }
            })
            .catch(next);
    } else {
        const limit = req.body.limit;
        const filter = req.body.filter;
        const fields = req.body.fields;
        Type.find(filter, fields)
            .limit(limit)
            .then(types => {
                res.send(types.map(type => type.publicData()));
            }).catch(next);
    }
}


//Modify type by ID (PUT)
const modifyType = (req, res, next) => {
	Type.findOne({number: req.params.id}) //revisar
	.then(type => {
		if(!type){
			return res.sendStatus(404);
		}
		const newInfoType = req.body;
		if (newInfoType.type){
			type.type = newInfoType.type;
		}
		if (newInfoType.imageUrl){
			type.imageUrl = newInfoType.imageUrl;
		}
		type.save()
			.then(updated => {
				res.status(201).send(updated.publicData());
			})
			.catch(next);
	})
	.catch(next);
}

//Delete type by ID (DELETE)
const deleteType = (req, res, next) => {
	Type.findOne({number: req.params.number})
	.then(del => {
		if (!deleteType) {
			return res.status(404).send(`The ${req.params.id} type hasn't been found`);
		}
		res.status(200)
		.send(`The ${req.params.type} type has been deleted successfully`);
	})
	.catch(next);
}

//Count the number of registers of types in the DB (rute /count)
const countType = (req, res, next) => {
    Type.aggregate([
        {'$count' : 'total'}
    ]).then(r => {
    res.status(200).send(r[0])
    }).catch(next)
}


module.exports = {
	getType,
	createType,
	modifyType,
	deleteType,
	countType,
};