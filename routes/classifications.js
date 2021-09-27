const router = require('express').Router()

const {
    getClassification,
    createClassification,
    modifyClassification,
    deleteClassification,
    countClassification,
} = require('../controllers/classification');

router.get('/', getClassification);
router.get('/count', countClassification);
router.get('/:id', getClassification)
router.post('/', createClassification);
router.put('/:id', modifyClassification);
router.delete('/:id', deleteClassification);

module.exports = router;