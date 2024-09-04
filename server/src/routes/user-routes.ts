import { Router } from 'express';
import { verifyToken } from '../lib/verify-user';
import { getUserInfo, changePassword, updateUserInfo, signout } from '../controllers/user-controller';

const userRoutes = Router();

userRoutes.get('/:id', getUserInfo);
userRoutes.post('/update/:userId', verifyToken, updateUserInfo);
userRoutes.post('/change-password/:userId', verifyToken, changePassword);
userRoutes.post('/signout', signout);

export default userRoutes;
