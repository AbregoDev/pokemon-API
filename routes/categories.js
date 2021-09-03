const router = require('express').Router()

const {
    getCategory,
    createCategory,
    modifyCategory,
    deleteCategory,
} = require('../controllers/categories');

router.get('/', getCategory);
router.post('/', createCategory);
router.put('/:id', modifyCategory);
router.delete('/:id', deleteCategory);

module.exports = router;