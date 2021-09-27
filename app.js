//Configuracion de base de datos
const mongoose = require('mongoose');




// Express
const express = require('express');


const app = express();
const cors = require('cors');

app.use(cors);
app.get('/allow-cors', function(request, response) {
	response.set('Access-Control-Allow-Origin', '*');
	response.sendFile(__dirname + '/message.json');
  });
// Body Parser
//const bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var isProduction = process.env.NODE_ENV === 'production';
// Mongoose config
mongoose.connect(
	process.env.MONGODB_URI, // obtiene la url de conexión desde las variables de entorno
	{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);


// Se habilita el debug
mongoose.set("debug", true);

//Modelos
require('./models/Pokemon');
require('./models/Gen');
require('./models/Type');
require('./models/Usuario');
require('./models/Classification')

// Configuracion de passport
require('./config/passport');  

//Routes
app.use('/v1', require('./routes'));


// Iniciando el servidor...
const server = app.listen(process.env.PORT || 3000, function () {
    console.log('Escuchando en el puerto ' + server.address().port);
});