import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
	{
		userName: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		profilePicture: String,
		converPicture: String,
		about: String,
		livesin: String,
		worksAt: String,
		relationship: String,
		followers: [],
		following: [],
	},
	{ timestamps: true },
);

const UserModel = mongoose.model('Users', UserSchema);

export default UserModel;
