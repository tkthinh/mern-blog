import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../lib/authenticated-request';

import { ErrorWithCode } from '../lib/custom-error';

import { db } from '../db/db';
import { user, post, follow } from '../db/schema';
import { eq, sql } from 'drizzle-orm';

export async function getUserInfo(req: Request, res: Response, next: NextFunction) {
  const userId = req.params.id;
  try {
    const result = await db
      .select({
        id: user.id,
        username: user.username,
        email: user.email,
        photoUrl: user.photoUrl,
        createdAt: user.createdAt,
        postCount: sql<number>`(SELECT COUNT(*) FROM ${post} WHERE ${post.authorId} = ${userId})`.as('post_count'),
        followingCount: sql<number>`(SELECT COUNT(*) FROM ${follow} WHERE ${follow.followerId} = ${user.id})`.as('following_count'),
        followerCount: sql<number>`(SELECT COUNT(*) FROM ${follow} WHERE ${follow.followingId} = ${user.id})`.as('follower_count'),
      })
      .from(user)
      .where(eq(user.id, userId))
      .limit(1);

    if (result.length === 0) {
      return next(new ErrorWithCode(404, 'User not found'));
    }

    res.status(200).json(result[0]);
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
