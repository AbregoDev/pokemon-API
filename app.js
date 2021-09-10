// Express
const express = require('express');
const app = express();

// Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Configuracion de base de datos
const mongoose = require('mongoose');
                                        //Se agrega la base a que nos conectamos
mongoose.connect("")

mongoose.set("debug", true)

//Modelos
require('./models/Pokemon')


//Routes
app.use('/v1', require('./routes'))

// Start server
const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}/v1`);
})