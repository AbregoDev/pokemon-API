const router = require('express').Router()

const {
    getClassfication,
    createClassfication,
    modifyClassfication,
    deleteClassfication,
    countClassfication,
} = require('../controllers/classfication');

router.get('/', getClassfication);
router.get('/count', countClassfication);
router.get('/:id', getClassfication)
router.post('/', createClassfication);
router.put('/:id', modifyClassfication);
router.delete('/:id', deleteClassfication);

module.exports = router;