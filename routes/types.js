const router = require('express').Router()

const {
    getType,
    createType,
    modifyType,
    deleteType,
    countType,
} = require('../controllers/types');

const auth = require('./auth');

router.get('/', getType);
router.get('/count', countType);
router.get('/:id', getType);
router.post('/', auth.requerido, createType);
router.put('/:id', auth.requerido, modifyType);
router.delete('/:id', auth.requerido, deleteType);

module.exports = router;