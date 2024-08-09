import express from 'express';
import { signup, signin, signinWithGoogle } from '../controllers/auth-controller';

const authRoutes = express.Router();

authRoutes.post('/signup', signup)
authRoutes.post('/signin', signin)
authRoutes.post('/google', signinWithGoogle)

export default authRoutes;