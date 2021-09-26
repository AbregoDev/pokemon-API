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
const user = 'pokemon';
const pass = 'gAR3PWIaw70zUJO4';
const db = 'BEDU-WEB';
const connectionString = `mongodb+srv://${user}:${pass}@cluster0.ewfpk.mongodb.net/${db}?retryWrites=true&w=majority`;
mongoose.connect(connectionString);

mongoose.set("debug", true);

//Modelos
require('./models/Pokemon');
require('./models/Gen');
require('./models/Type');
require('./models/Classification')

//Routes
app.use('/v1', require('./routes'));

// Start server
const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}/v1`);
});