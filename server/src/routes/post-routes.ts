import { Router } from 'express';
import createNewPost from '../controllers/post-controller';

const postRoutes = Router();

postRoutes.post('/new', createNewPost)

export default postRoutes;