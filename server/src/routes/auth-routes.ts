import express from 'express';
import { signup, signin, loginWithGoogle } from '../controllers/auth-controller';

const authRoutes = express.Router();

authRoutes.post('/signup', signup)
authRoutes.post('/signin', signin)
authRoutes.get('/google', loginWithGoogle)

export default authRoutes;