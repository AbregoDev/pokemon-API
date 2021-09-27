//Configuracion de base de datos
const mongoose = require('mongoose');

// Express
const express = require('express');
const app = express();

// Body Parser
// const bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Mongoose config
mongoose.connect(
	process.env.MONGO_URI, // obtiene la url de conexión desde las variables de entorno
	{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);

mongoose.set("debug", true);

//Modelos
require('./models/Pokemon');
require('./models/Gen');
require('./models/Type');
require('./models/Classification')

//Routes
app.use('/v1', require('./routes'));

// Start server
app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`)
})