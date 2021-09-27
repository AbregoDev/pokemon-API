const router = require('express').Router();

router.get('/', (req, res) => {
    res.send({'welcome to Pokémon API':['/v1/pokemons','/v1/classification','/v1/types','/v1/gens', '/v1/usuarios']});
});

router.use('/pokemons', require('./pokemons'));
router.use('/classification', require('./classifications'));
router.use('/types', require('./types'));
router.use('/gens', require('./gens'));
router.use('/usuarios', require('./usuarios'));

module.exports = router;