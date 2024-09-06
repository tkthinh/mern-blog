import { Router } from 'express';
import { verifyToken } from '../lib/verify-user';
import { getUserInfo, updateUserInfo } from '../controllers/user-controller';

const userRoutes = Router();

userRoutes.get('/:id', getUserInfo);
userRoutes.post('/update/:userId', verifyToken, updateUserInfo);

export default userRoutes;
