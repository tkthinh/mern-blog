import { Router } from 'express';
import { verifyToken } from '../lib/verify-user';
import { changePassword, updateUserInfo } from '../controllers/user-controller';

const userRoutes = Router();

userRoutes.post('/update/:userId', verifyToken, updateUserInfo);
userRoutes.post('/change-password/:userId', verifyToken, changePassword);

export default userRoutes;
