const mongoose = require('mongoose');
const Gen = mongoose.model('Gen');

//Create new gen (POST)
const createGen = (req, res, next) => {
	const gen = new Gen(req.body);
	gen.save()
        .then(gen => {
            res.status(200).send(gen.publicData());
        })
        .catch(next);
}

//Get all gens by ID (GET)
const getGen = (req, res, next) => {
	if (req.params.id) {
        const fields = req.body.fields;
        Gen.findOne({ number: req.params.id}, fields)
            .then(gen => { 
                if(gen) {
                    res.status(200).send(gen.publicData());
                } else {
                    res.status(404).send('Gen not found');
                }
            })
            .catch(next);
    } else if (req.params.name) {
        const fields = req.body.fields;
        Gen.findOne({ name: req.params.name}, fields)
            .then(gen => {
                if(gen) {
                    res.status(200).send(gen.publicData());
                } else {
                    res.status(404).send('Gen not found');
                }
            })
            .catch(next);
    } else {
        const limit = req.body.limit;
        const filter = req.body.filter;
        const fields = req.body.fields;
        Gen.find(filter, fields)
            .limit(limit)
            .then(gens => {
                res.send(gens.map(gen => gen.publicData()));
            }).catch(next);
    }
}

//Modify gen by id (PUT)
const modifyGen = (req, res, next) => {
    Gen.findOne({ number: req.params.id })
        .then(gen => {
            if (!gen) {
                return res.sendStatus(404);
            }
            
            const newInfoGen = req.body;

            if(newInfoGen.number) {
                gen.number = newInfoGen.number
            }
            if(newInfoGen.name) {
                gen.name = newInfoGen.name
            }
            
            gen.save()
                .then(updated => {
                    res.status(201).send(updated.publicData());
                })
                .catch(next);
        }).catch(next);
}

//Delete gen by id (DELETE)
const deleteGen = (req, res, next) => {
    Gen.findOneAndDelete({ number: req.params.id })
        .then(deletedGen => {
            if(!deletedGen) {
                return res.status(404).send(`Generation ${req.params.id} hasn't been found`);
            }

            res.status(200)
                .send(`The Generation ${req.params.id} has been deleted successfully`);
        })
        .catch(next);
}

//Count the number of registers of gen in the DB (rute /count)
const countGen = (req, res, next) => {
    Gen.aggregate([
        {'$count' : 'total'}
    ]).then(r => {
    res.status(200).send(r[0])
    }).catch(next)
}

module.exports = {
	getGen,
	createGen,
	modifyGen,
	deleteGen,
    countGen
};