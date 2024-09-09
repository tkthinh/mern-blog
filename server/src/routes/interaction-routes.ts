import { Router } from 'express';
import {
  fetchLike,
  fetchBookmark,
  fetchComment,
  toggleLike,
  toggleBookmark,
  addComment,
  getFollower,
  toggleUserFollow
} from '../controllers/interact-controller';
import { verifyToken } from '../lib/verify-user';

const interactionRoutes = Router();

interactionRoutes.get('/get/like', fetchLike);
interactionRoutes.post('/like', verifyToken, toggleLike);

interactionRoutes.get('/get/comment', fetchComment);
interactionRoutes.post('/comment', verifyToken, addComment);

interactionRoutes.get('/get/bookmark', fetchBookmark);
interactionRoutes.post('/bookmark', verifyToken, toggleBookmark);

interactionRoutes.get('/get/follow', getFollower);
interactionRoutes.post('/follow', verifyToken, toggleUserFollow);

export default interactionRoutes;
