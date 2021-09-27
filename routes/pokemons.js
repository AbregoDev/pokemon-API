const router = require('express').Router()

const {
    getPokemon,
    countPokemon,
    createPokemon,
    modifyPokemon,
    deletePokemon,
} = require('../controllers/pokemons');
const auth = require('./auth');

router.get('/', getPokemon);
router.get ('/count', countPokemon);
router.get ('/:id', getPokemon);
router.post('/', auth.requerido, createPokemon);
router.put('/:id', auth.requerido, modifyPokemon);
router.delete('/:id', auth.requerido, deletePokemon);

module.exports = router;