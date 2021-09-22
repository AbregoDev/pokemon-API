const router = require('express').Router()

const {
    getType,
    createType,
    modifyType,
    deleteType,
    countType,
} = require('../controllers/types');

router.get('/', getType);
router.get('/count', countType);
router.get('/:id', getType);
router.post('/', createType);
router.put('/:id', modifyType);
router.delete('/:id', deleteType);

module.exports = router;