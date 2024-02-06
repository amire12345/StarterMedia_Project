import PostModel from '../Models/postModel.js';
import mongoose from 'mongoose';

// Create new post

export const createPost = async (req, res) => {
	const newPost = PostModel(req.body);

	try {
		await newPost.save();
		res.status(200).json(newPost);
	} catch (error) {
		res.status(500).json(error);
	}
};
