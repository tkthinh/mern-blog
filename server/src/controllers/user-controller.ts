import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../lib/authenticated-request';

import { ErrorWithCode } from '../lib/custom-error';
import { passwordIsConfirmed } from '../lib/validation';
import bcryptjs from 'bcryptjs';

import { db } from '../db/db';
import { user } from '../db/schema';
import { eq } from 'drizzle-orm';

export async function getUserInfo(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await db.query.user.findFirst({
      columns: {
        username: true,
        photoUrl: true,
        createdAt: true,
      },
      where: eq(user.id, req.params.id),
    });

    if(!result){
      return next(new ErrorWithCode(404, 'User not found'));
    };

    res.status(200).json(result)

  } catch (error) {
    return next(new ErrorWithCode(500, 'Error getting user info'));
  }
}

export async function updateUserInfo(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    return next(new ErrorWithCode(400, 'Invalid request'));
  }

  if (req.user.id !== req.params.userId) {
    return next(new ErrorWithCode(403, 'You are not allowed to update this user'));
  }

  const updatedUserInfo = {
    id: req.user.id,
    name: req.body.username,
    email: req.body.email,
    photoUrl: req.body.photoUrl,
  };

  try {
    await db.update(user).set(updatedUserInfo).where(eq(user.id, req.user.id));

    const responseData = {
      message: {
        id: updatedUserInfo.id,
        username: updatedUserInfo.name,
        email: updatedUserInfo.email,
        photoUrl: updatedUserInfo.photoUrl,
      },
    };

    res.status(200).json(responseData);
  } catch (error) {
    return next(new ErrorWithCode(500, 'Error changing user info'));
  }
}

export async function changePassword(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    return next(new ErrorWithCode(400, 'Invalid request'));
  }

  if (req.user.id !== req.params.userId) {
    return next(new ErrorWithCode(403, 'You are not allowed to update this user'));
  }

  const currentPassword = req.body['current-password'];
  const newPassword = req.body['new-password'];
  const confirmedPassword = req.body['confirm-password'];

  const storedPassword = (
    await db.select({ password: user.password }).from(user).where(eq(user.id, req.user.id))
  )[0].password;
  const passwordMatched = await bcryptjs.compare(currentPassword, storedPassword);

  if (!passwordMatched) {
    return next(new ErrorWithCode(400, 'Current password is incorrect'));
  }

  if (newPassword !== null) {
    if (newPassword.length < 6) {
      return next(new ErrorWithCode(400, 'Password must be longer than 6 characters'));
    }
  }

  if (!passwordIsConfirmed(newPassword, confirmedPassword)) {
    return next(new ErrorWithCode(400, 'Please check if the new password is matched'));
  }

  const newHashedPassword = bcryptjs.hashSync(newPassword, 10);
  try {
    await db.update(user).set({ password: newHashedPassword }).where(eq(user.id, req.user.id));

    const responseData = {
      message: {
        id: req.body.id,
        username: req.body.username,
        email: req.body.email,
        photoUrl: req.body.photoUrl,
      },
    };

    res.status(200).json(responseData);
  } catch (error) {
    return next(new ErrorWithCode(500, 'Error changing user password'));
  }
}

export function signout(req: Request, res: Response, next: NextFunction) {
  try {
    return res.clearCookie('access_token').status(200).json('Signed out');
  } catch (error) {
    return next(new ErrorWithCode(500, 'Error signing out'));
  }
}
