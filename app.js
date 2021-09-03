// Express
const express = require('express');
const app = express();

// Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/v1', require('./routes'));

// Start server
const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}/v1`);
})