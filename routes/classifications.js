const router = require('express').Router()

const {
    getClassification,
    createClassification,
    modifyClassification,
    deleteClassification,
    countClassification,
} = require('../controllers/classification');

const auth = require('./auth');

router.get('/', getClassification);
router.get('/count', countClassification);
router.get('/:id', getClassification)
router.post('/', auth.requerido, createClassification);
router.put('/:id', auth.requerido, modifyClassification);
router.delete('/:id', auth.requerido, deleteClassification);

module.exports = router;