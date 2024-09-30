const express = require('express');
require('express-async-errors');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const errorHandler = require('./middlewares/errorhandler');
const notFoundPage = require('./middlewares/notfoundpage');
const appRouter = require('./routes/main');

const app = express();
const PORT = process.env.PORT || 5500;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/v1', (req, res) => {
	res.status(201).send(`<h1>Welcome to my page</h1>`);
});
app.use('/api/v1', appRouter);

app.use(notFoundPage);
app.use(errorHandler);

const start = async () => {
	try {
		app.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`);
		});
	} catch (error) {
		console.log('error starting server', error);
	}
};

start();
