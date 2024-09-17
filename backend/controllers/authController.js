import bcrypt from 'bcrypr';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

class AuthController {

	async signup(req, res) {
		try {
			const { name, email, password } = req.body;

			// check if user already exists
			const findUser = await User.findOne({ email });
			if (findUser) {
				return res.status(400).json({ message: 'User already exists' });
			}

			// hash the password
			const hashedPassword = await bcrypt.hash(password, 10);

			// create the user
			const user = await User.create({
				name,
				email,
				password: hashedPassword,
			});

			// generate a JWT token
			const token = jwt.sign(
				{ userId: user._id: user.role },
				process.env.JWT_SECRET,
				{ expiresIn: '1d' }
			);

			return res.status(201).json({
				message: 'user created successfully',
				token,
				user: {
					id: user._id,
					name: user.name,
					email: user.email
				}
			});
			catch (error) {
				console.error(error); // Log error for debugging
				return res.status(500).json({ error: 'Server error', details: error.message });
			}
		}
		async login(req, res) {
			// login logic 
			try {
				const { email, password } = req.body;

				// check if the user exists
				const user = await User.findOne({ email });
				if (!user) {
					return res.status(400).json({ message: 'User not found'});
				}
				// compare password 
				const isMatch = await bcrypt.compare(password, user.password);
				if (!isMatch) {
					return res.status(400).json({message: 'Invalid credentials'});
				}

				// create a jwt token
				const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
					expiresIn: '1d;,
				});
				res.status(200).json({
					message: 'Login successful',
					token,
					user:{
						id: user._id,
						name: user._name,
						email: user.email,
					},
				});
			} catch (error) {
				res.status(500).json({ error: 'Server error', details: error });
			}
		}

		async logout(req, res) {
			// log out logic

			try {
				res.clearCookie('token');
				res.status(200).json({message: 'Logged out successfully' });
			} catch (error) {
				res.status(500).json({ error: 'Server error', details: error });
			}
		}
		async forgotPassword(req, res) {
			// forgot password
		}
		async resetPassword(req, res) {
			// reset password logic
		}
		async getProfile(req, res) {
			// get profile logics
		}
		async updateProfile(req, res) {
			// update profile 
			try {
				const userId = req.userId;
				const {name, email, password, address, phone} = req.body;

				// find user by id
				const user = await User.findById(userId);
				if (!user) {
					return res.status(400).json({ message: 'Usernot found'});
				}

				if (name) user.name = name;
				if (email) user.email = email;
				if (address) user.address = address;
				if (phone) user.phone = phone;
				if (password) {
					const hashedPassword = await bcrypt.hash(password, 10);
					user.password = hashedPassword;
				}
				user.updatedAt = Date.now();
				await user.save();
				res.status(200).json({ message: 'Profile updated successfully',
					user: {
						id: user._id,
						name: user.name,
						email: user.email,
						address: user.address,
						createdAt: user.createdAt,
						updatedAt: user.updatedAt,
					},
				});
			} catch (error) {
				res.status(500).json({ error: 'Server error', details: error });
			}
		}



			
