const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
	return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const registerUser = async (request, response) => {
	const { email, password } = request.body;

	try {
		const user = await User.signup(email, password);
		const token = createToken(user._id);
		return response.status(200).json({ email, token });
	} catch (error) {
		return response.status(400).json({ error: error.message });
	}
};

const loginUser = async (request, response) => {
	const { email, password } = request.body;

	try {
		const user = await User.login(email, password);
		const token = createToken(user._id);
		return response.status(200).json({ email, token });
	} catch (error) {
		return response.status(400).json({ error: error.message });
	}
};

module.exports = {
	registerUser,
	loginUser,
};
