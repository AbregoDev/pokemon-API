const router = require('express').Router()

const {
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