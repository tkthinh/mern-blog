import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../lib/authenticated-request';

import { ErrorWithCode } from '../lib/custom-error';

import { db } from '../db/db';
import { user } from '../db/schema';
import { eq } from 'drizzle-orm';

export async function getUserInfo(req: Request, res: Response, next: NextFunction) {
  const userId = req.params.id
  try {
    const result = await db.query.user.findFirst({
      columns: {
        username: true,
        photoUrl: true,
        createdAt: true,
      },
      where: eq(user.id, userId),
    });

    if (!result) {
      return next(new ErrorWithCode(404, 'User not found'));
    }

    res.status(200).json(result);
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
    const updatedUser = await db
      .update(user)
      .set(updatedUserInfo)
      .where(eq(user.id, req.user.id))
      .returning();

    const { password: abc, ...responseData } = updatedUser[0];

    res.status(200).json({ message: responseData });
  } catch (error) {
    return next(new ErrorWithCode(500, 'Error changing user info'));
  }
}
