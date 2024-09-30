const jwt = require('jsonwebtoken');
const {BadRequestAPIErr} = require('../errors');

const login = async (req, res, next) => {
	const {username, password} = req.body;

	if (!username || !password) {
		throw new BadRequestAPIErr('Provided username and password');
	}

	const randomId = Math.floor(Math.random() * 100);
	const token = jwt.sign({id: randomId, username}, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});
	// console.log(`username: ${username}, password: ${password}, token: ${token}`);
	res.status(200).json({msg: 'user created', token});
};
const dashboard = async (req, res) => {
	const luckyNumber = Math.floor(Math.random() * 100);

	res.status(200).json({
		msg: `Hello, ${req.user.username}`,
		secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
	});
};

module.exports = {login, dashboard};
