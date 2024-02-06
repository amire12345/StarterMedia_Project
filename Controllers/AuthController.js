import UserModel from '../Models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Registring a new User
export const registerUser = async (req, res) => {
	// to hash the password taill of 10
	const salt = await bcrypt.genSalt(10);
	const hashedPass = await bcrypt.hash(req.body.password, salt);
	req.body.password = hashedPass;

	const newUser = new UserModel(req.body);
	const { userName } = req.body;

	// It's Time to save a user in database

	try {
		const oldUser = await UserModel.findOne({ userName });

		if (oldUser) {
			return res
				.status(400)
				.json({ message: 'userName is already registered!' });
		}

		const user = await newUser.save();

		const token = jwt.sign(
			{
				userName: user.userName,
				id: user._id,
			},
			process.env.JWT_KEY,
			{ expiresIn: '1h' },
		);
		res.status(200).json({ user, token });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Login User

export const loginUser = async (req, res) => {
	const { userName, password } = req.body;

	try {
		const user = await UserModel.findOne({ userName: userName });

		if (user) {
			const validity = await bcrypt.compare(password, user.password);

			if (!validity) {
				res.status(400).json('Wrong password');
			} else {
				const token = jwt.sign(
					{
						userName: user.userName,
						id: user._id,
					},
					process.env.JWT_KEY,
					{ expiresIn: '1h' },
				);
				res.status(200).json({ user, token });
			}
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
