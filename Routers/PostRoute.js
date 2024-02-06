import express from 'express';
import { createPost, getTimelinePosts } from '../Controllers/PostController.js';
const router = express.Router();

router.post('/', createPost);

router.get('/:id/timeline', getTimelinePosts);

export default router;
