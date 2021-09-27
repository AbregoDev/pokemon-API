const router = require('express').Router()

const {
    getGen,
    createGen,
    modifyGen,
    deleteGen,
    countGen,
} = require('../controllers/gens');

const auth = require('./auth');

router.get('/', getGen);
router.get('/count',countGen)
router.get('/:id', getGen);
router.post('/', auth.requerido, createGen);
router.put('/:id', auth.requerido, modifyGen);
router.delete('/:id', auth.requerido, deleteGen);

module.exports = router;