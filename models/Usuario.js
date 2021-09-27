
// Importando módulo crypto
const crypto = require('crypto');                             
// Importando módulo jsonwebtoken
const jwt = require('jsonwebtoken');                          

const secret = require('../config').secret;                   
console.log("                 ###########################             ")
console.log(secret);

// Importando mongoose.
const mongoose = require('mongoose');  
// Importando módulo mongoose-unique-validator, pendiente de instalar.                       
const uniqueValidator = require("mongoose-unique-validator"); 

// Definiendo cada campo con sus tipos de dato y las validaciones sobre este.
const UsuarioSchema = new mongoose.Schema({                   
username: {
    type: String,
    unique: true, //este campo no se puede repetir
    lowercase: true,
    required: [true, "no puede estar vacío"],
    match: [/^[a-zA-Z0-9]+$/, "es inválido"],
    index: true,
},                                           
nombre: { type: String, required: true },
apellido: { type: String, required: true },
email: {
    type: String,
    unique: true, //este campo no se puede repetir
    lowercase: true,
    required: [true, "no puede estar vacío"],
    match: [/\S+@\S+\.\S+/, "es inválido"],
    index: true,
},
ubicacion: String,
telefono: String,
bio: String,
foto: String,
tipo: { type: String, enum: ['Viewer', 'Administrator'] },
hash: String, //este campo se utilizará para la sesión
salt: String, //este campo se utilizará para la sesión
},
{ timestamps: true }
);

// Usando plugin de validación para que no se repitan correos ni usernames
UsuarioSchema.plugin(uniqueValidator, { message: "Ya existe" }); 

UsuarioSchema.methods.crearPassword = function (password) {    
    this.salt = crypto.randomBytes(16).toString("hex"); // generando una "sal" random para cada usuario
    this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex"); // generando un hash utilizando la salt
};

// Metodo usado para validar el password sin necesidad de gardarlo el la DB
UsuarioSchema.methods.validarPassword = function (password) {
    const hash = crypto
      .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
      .toString("hex");
    return this.hash === hash;
  };


  // Genera un JWT para el manejo de sesiones
UsuarioSchema.methods.generarJWT = function() {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60); // 60 días antes de expirar
  
    return jwt.sign({
      id: this._id,
      username: this.username,
      exp: parseInt(exp.getTime() / 1000),
    }, secret);
};


// Regresa una representacion JSON de un usuario ya autenticado
UsuarioSchema.methods.toAuthJSON = function(){
    return {
      username: this.username,
      email: this.email,
      token: this.generarJWT()
    };
};


// Regresa la representación de un usuario, sólo datos públicos
UsuarioSchema.methods.publicData = function(){
    return {
        id: this.id,
        username: this.username,
        email: this.email,
        nombre: this.nombre,
        apellido: this.apellido,
        bio: this.bio,
        foto: this.foto,
        tipo: this.tipo,
        ubicacion: this.ubicacion,
        telefono: this.telefono,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

//Define el modelo Usuario, utilizando el esquema UsuarioSchema.
mongoose.model("Usuario", UsuarioSchema);    