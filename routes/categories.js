const router = require('express').Router()

const {
    getCategory,
    createCategory,
    modifyCategory,
    deleteCategory,
    countCategory,
} = require('../controllers/categories');

router.get('/', getCategory);
router.get('/count', countCategory);
router.get('/:id', getCategory)
router.post('/', createCategory);
router.put('/:id', modifyCategory);
router.delete('/:id', deleteCategory);

module.exports = router;