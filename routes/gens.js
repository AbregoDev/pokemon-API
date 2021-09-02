var router = require('express').Router()

var {
    getGen,
    createGen,
    modifyGen,
    deleteGen,
} = require('../controllers/gens');

router.get('/', getGen);
router.post('/', createGen);
router.put('/:id', modifyGen);
router.delete('/:id', deleteGen);

module.exports = router;