const mongoose = require('mongoose');
const Gen = mongoose.model('Gen');

const createGen = (req, res, next) => {
	const gen = new Gen(req.body);
	gen.save()
        .then(gen => {
            res.status(200).send(gen.publicData());
        })
        .catch(next);
}

const getGen = (req, res, next) => {
	if (req.params.id) {
        Gen.findOne({ number: req.params.id})
            .then(gen => { 
                if(gen) {
                    res.status(200).send(gen.publicData());
                } else {
                    res.status(404).send('No se ha encontrado');
                }
            })
            .catch(next);
    } else if (req.params.name) {
        Gen.findOne({ name: req.params.name})
            .then(gen => {
                if(gen) {
                    res.status(200).send(gen.publicData());
                } else {
                    res.status(404).send('No se ha encontrado');
                }
            })
            .catch(next);
    } else {
        Gen.find()
            .then(gens => {
                res.send(gens.map(gen => gen.publicData()));
            }).catch(next);
    }
}

const modifyGen = (req, res, next) => {
    Gen.findOne({ number: req.params.id })
        .then(gen => {
            if (!gen) {
                return res.sendStatus(404);
            }
            
            const nuevaInfoGen = req.body;

            if(nuevaInfoGen.number) {
                gen.number = nuevaInfoGen.number
            }
            if(nuevaInfoGen.name) {
                gen.name = nuevaInfoGen.name
            }
            
            gen.save()
                .then(updated => {
                    res.status(201).send(updated.publicData());
                })
                .catch(next);
        }).catch(next);
}

const deleteGen = (req, res, next) => {
    Gen.findOneAndDelete({ number: req.params.id })
        .then(deletedGen => {
            if(!deletedGen) {
                return res.status(404).send(`Generation ${req.params.id} hasn't been found`);
            }

            res.status(200)
                .send(`The Generation with number ${req.params.id} has been deleted successfully`);
        })
        .catch(next);
}

// TODO: count

module.exports = {
	getGen,
	createGen,
	modifyGen,
	deleteGen,
};