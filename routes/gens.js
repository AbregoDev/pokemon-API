const router = require('express').Router()

const {
    getGen,
    createGen,
    modifyGen,
    deleteGen,
} = require('../controllers/gens');

router.get('/', getGen);
router.get('/:id', getGen);
// router.getByName('/:name', getGen);
router.post('/', createGen);
router.put('/:id', modifyGen);
// router.put('/:name', modifyGen);
router.delete('/:id', deleteGen);
// router.delete('/:name', deleteGen);

module.exports = router;