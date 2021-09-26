const router = require('express').Router()

const {
    getClassfication,
    createClassfication,
    modifyClassfication,
    deleteClassfication,
    countClassfication,
} = require('../controllers/classfication');

const auth = require('./auth');

router.get('/', getClassfication);
router.get('/count', countClassfication);
router.get('/:id', getClassfication)
router.post('/', auth.requerido, createClassfication);
router.put('/:id', auth.requerido, modifyClassfication);
router.delete('/:id', auth.requerido, deleteClassfication);

module.exports = router;