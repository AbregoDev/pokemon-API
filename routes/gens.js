const router = require('express').Router()

const {
    getGen,
    createGen,
    modifyGen,
    deleteGen,
    countGen,
} = require('../controllers/gens');

router.get('/', getGen);
router.get('/count',countGen)
router.get('/:id', getGen);
router.post('/', createGen);
router.put('/:id', modifyGen);
router.delete('/:id', deleteGen);

module.exports = router;