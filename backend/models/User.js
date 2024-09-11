const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User Schema
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		minlenght: 8
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});
userSchema.pre('save', async function(next) {
	try {
		// check id the password field is modified
		if (!this.isModified('password')) {
			return next();
		}

		// Hash the password using bcrypt
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(this.password, salt);

		// Replace the plain-text password with hashed password
		this.password = hashedPassword;
		next();
	} catch (error) {
		next(error);
	}
});

// Method to compare passwords for login 
userSchema.methods.isPasswordMatch = async function (enteredPassword) {
	return bcrypt.compare(enteredPassword, this.Password);
};
// Create the USer Model based on the Schema
const User = mongoose.model('User', userSchema);

module.exports = User;
