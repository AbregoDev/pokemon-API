const router = require('express').Router()

const {
    getPokemon,
    countPokemon,
    createPokemon,
    modifyPokemon,
    deletePokemon,
} = require('../controllers/pokemons');
const auth = require('./auth');

router.get('/',auth.requerido, getPokemon);
router.get ('/count', countPokemon);
router.get ('/:id', getPokemon);
router.post('/', createPokemon);
router.put('/:id', modifyPokemon);
router.delete('/:id', deletePokemon);

module.exports = router;