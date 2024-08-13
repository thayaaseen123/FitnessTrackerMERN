const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

userSchema.statics.signup = async function (email, password) {
	const emailExists = await this.findOne({ email });

	if (emailExists) {
		throw Error("Email already in use!");
	}

	if (!email || !password) {
		throw Error("Email and password are both required!");
	} else if (!validator.isEmail(email)) {
		throw Error("Invalid email!");
	} else if (!validator.isStrongPassword(password)) {
		throw Error("Password is not strong enough!");
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const user = await this.create({ email, password: hashedPassword });

	return user;
};

userSchema.statics.login = async function (email, password) {
	if (!email || !password) {
		throw Error("Email and password are both required!");
	}

	const user = await this.findOne({ email });

	if (!user) {
		throw Error("Email and/or password incorrect!");
	}

	const passwordMatches = await bcrypt.compare(password, user.password);

	if (!passwordMatches) {
		throw Error("Email and/or password incorrect!");
	}

	return user;
};

module.exports = mongoose.model("User", userSchema);
