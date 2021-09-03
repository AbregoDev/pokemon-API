const router = require('express').Router()

const {
    getPokemon,
    createPokemon,
    modifyPokemon,
    deletePokemon,
} = require('../controllers/pokemons');

router.get('/', getPokemon);
router.post('/', createPokemon);
router.put('/:id', modifyPokemon);
router.delete('/:id', deletePokemon);

module.exports = router;