import express from 'express';

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AuthRoute from './Routers/AuthRoute.js';
import UserRoute from './Routers/UserRoute.js';
import postRoute from './Routers/PostRoute.js';
import cors from 'cors';
import UploadRoute from './Routers/UploadRoute.js';
// Routes
const app = express();

dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
mongoose
	.connect(process.env.MONGO_DB)
	.then(() =>
		app.listen(process.env.PORT, () =>
			console.log(`Listening at ${process.env.PORT}`),
		),
	)
	.catch(error => {
		console.log('Error');
	});

// Usage of routes

app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/post', postRoute);
app.use('/upload', UploadRoute);
