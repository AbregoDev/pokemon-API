
const mongoose = require("mongoose")
const Usuario = mongoose.model("Usuario")
const passport = require('passport');

mongoose.set("debug", true);

function crearUsuario(req, res, next) {
    // Instanciaremos un nuevo usuario utilizando la clase usuario
    console.log("Llego request crear usuario");
    const body = req.body;
    const password = body.password

    delete body.password
    const usuario = new Usuario(body)
    usuario.crearPassword(password)
    // Se guarda nuevo usuario en MongoDB.
    usuario.save().then(user => {                                         
        return res.status(201).json(user.toAuthJSON())
    }).catch(next)
}

function obtenerUsuarios(req, res, next) {    
    // Se obtiene usuario desde MongoDB.    
    console.log("Llamada obtener usuario   ....");    
    console.log(req.body._id);                   
    //Usuario.findById(req.usuario.id, (err, user) => {
    Usuario.findById(req.body._id, (err, user) => {
            console.log(user);
            console.log(err);
        if (!user || err) {
            console.log("Error");
            return res.sendStatus(401)
        }else{
            return res.status(201).json(user.publicData());
        }
    }).catch(next);
}

function modificarUsuario(req, res, next) {
    //console.log(req.usuario)
    console.log("  ....................        Llego modificar    ...............");
    console.log(req.body);
    //Usuario.findById(req.usuario.id).then(user => {
    Usuario.findById(req.body._id).then(user => {
        if (!user) { return res.sendStatus(401); }
        let nuevaInfo = req.body
        if (typeof nuevaInfo.username !== 'undefined')
            user.username = nuevaInfo.username
        if (typeof nuevaInfo.apellido !== 'undefined')
            user.apellido = nuevaInfo.apellido
        if (typeof nuevaInfo.bio !== 'undefined')
            user.bio = nuevaInfo.bio
        if (typeof nuevaInfo.foto !== 'undefined')
            user.foto = nuevaInfo.foto
        if (typeof nuevaInfo.ubicacion !== 'undefined')
            user.ubicacion = nuevaInfo.ubicacion
        if (typeof nuevaInfo.telefono !== 'undefined')
            user.telefono = nuevaInfo.telefono
        if (typeof nuevaInfo.password !== 'undefined')
            user.crearPassword(nuevaInfo.password)
        user.save().then(updatedUser => {    //Guardando usuario modificado en MongoDB.
            return res.status(201).json(updatedUser.publicData())
        }).catch(next);
    }).catch(next);
}


//const  eliminarUsuario = (req, res, next) => {  
function  eliminarUsuario(req, res, next){ 
  // Borra a su propio usuario obteniendo el id del token
  console.log("Llego solicitud de eliminar");
  Usuario.findOneAndDelete({ _id: req.usuario.id }).then(r => {         // Buscando y eliminando usuario en MongoDB.
    return res.status(200).send(`Usuario ${req.params.id} eliminado: ${r}`);
  }).catch(next);
}

function iniciarSesion(req, res, next) {
    console.log("........           Iniciar sesion -------------");
    if (!req.body.email) {
        return res.status(422).json({ errors: { email: "no puede estar vacío" } });
    }

    if (!req.body.password) {
        return res.status(422).json({ errors: { password: "no puede estar vacío" } });
    }

    passport.authenticate('local', { session: false }, function (err, user, info) {
        if (err) { return next(err); }

        if (user) {
            user.token = user.generarJWT();
            return res.json({ user: user.toAuthJSON() });
        } else {
            return res.status(422).json(info);
        }
    })(req, res, next);
}

module.exports = {
    crearUsuario,
    obtenerUsuarios,
    modificarUsuario,
    eliminarUsuario,
    iniciarSesion
}