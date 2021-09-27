
// Se importa passport, que es un middleware para autenticación.
const passport = require('passport');    
// Se importa estrategia autenticación. --> passport-local
const LocalStrategy = require('passport-local').Strategy;   
const mongoose = require('mongoose');
const Usuario = mongoose.model("Usuario");
//const Usuario = mongoose.model("Usuario", UsuarioSchema);



// Se configuran los elementos utilizados para habilitar sesión.
passport.use(new LocalStrategy({                            
    usernameField: 'email',
    passwordField: 'password'
}, function (email, password, done) {
    Usuario.findOne({ email: email }).then(function (user) {
    if (!user || !user.validarPassword(password)) {
      return done(null, false, { errors: { 'email o contraseña': 'equivocado(a)' } });
    }
    return done(null, user);
  }).catch(done);
}));