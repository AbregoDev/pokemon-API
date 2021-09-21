const router = require('express').Router()

const {
    getPokemon,
    countPokemon,
    createPokemon,
    modifyPokemon,
    deletePokemon,
} = require('../controllers/pokemons');

router.get('/', getPokemon);
router.get ('/count', countPokemon);
router.get ('/:id', getPokemon);
router.post('/', createPokemon);
router.put('/:id', modifyPokemon);
router.delete('/:id', deletePokemon);

module.exports = router;