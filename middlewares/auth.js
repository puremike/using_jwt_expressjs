const jwt = require('jsonwebtoken');
const {UnauthenticatedAPIErr} = require('../errors');

const authMiddleware = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		console.log(authHeader);
		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			throw new UnauthenticatedAPIErr('No token provided');
		}

		const token = authHeader.split(' ')[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const {id, username} = decoded;
		req.user = {id, username};
		next();
	} catch (error) {
		throw new UnauthenticatedAPIErr('Not authorized to access this route');
	}
};

module.exports = authMiddleware;
