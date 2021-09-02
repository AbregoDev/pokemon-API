var router = require('express').Router();

router.get('/', (req, res) => {
    res.send('welcome to Pokémon API');
})

router.use('/pokemons', require('./pokemons'));
router.use('/categories', require('./categories'));
router.use('/types', require('./types'));

module.exports = router;