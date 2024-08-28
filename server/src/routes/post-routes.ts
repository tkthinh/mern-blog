import { Router } from 'express';
import { createNewPost, fetchAllPosts, fetchOnePost, searchPosts } from '../controllers/post-controller';
import { verifyToken } from '../lib/verify-user';

const postRoutes = Router();

postRoutes.get('/get', fetchAllPosts);
postRoutes.get('/search', searchPosts);
postRoutes.get('/p/:id', fetchOnePost);
postRoutes.post('/new', verifyToken, createNewPost);

export default postRoutes;
