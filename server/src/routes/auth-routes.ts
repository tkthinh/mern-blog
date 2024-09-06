import express from 'express';
import { verifyToken } from '../lib/verify-user';
import {
  signup,
  signin,
  signinWithGoogle,
  changePassword,
  signout,
} from '../controllers/auth-controller';

const authRoutes = express.Router();

authRoutes.post('/signup', signup);
authRoutes.post('/signin', signin);
authRoutes.post('/google', signinWithGoogle);
authRoutes.post('/change-password/:userId', verifyToken, changePassword);
authRoutes.post('/signout', signout);

export default authRoutes;
