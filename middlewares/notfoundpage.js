const notFoundPage = (req, res) => {
	res.status(404).send(`<h1>Page not available</h1>`);
};

module.exports = notFoundPage;
