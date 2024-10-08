import { Request, Response, NextFunction } from 'express';
import { ErrorWithCode } from '../lib/custom-error';

import { db } from '../db/db';
import { like, bookmark, comment, user, follow } from '../db/schema';
import { eq, and, sql } from 'drizzle-orm';

export async function fetchLike(req: Request, res: Response, next: NextFunction) {
  const { postId, userId } = req.query;

  try {
    const totalLikesQuery = db
      .select({
        count: sql<number>`cast(count(distinct ${like.id}) as int)`,
      })
      .from(like)
      .where(eq(like.postId, `${postId}`));

    let userLikedQuery;

    if (userId) {
      userLikedQuery = db
        .select({
          liked: sql<boolean>`EXISTS(SELECT 1)`,
        })
        .from(like)
        .where(and(eq(like.userId, `${userId}`), eq(like.postId, `${postId}`)));
    }

    const [totalLikesResult, userLikedResult] = await Promise.all([
      totalLikesQuery.execute(),
      userId ? userLikedQuery?.execute() : Promise.resolve([{ liked: false }]),
    ]);

    res.status(200).json({
      totalLike: totalLikesResult[0].count,
      userLiked: userLikedResult ? userLikedResult[0].liked : false,
    });
  } catch (error) {
    return next(new ErrorWithCode(500, 'Error fetching likes'));
  }
}

export async function toggleLike(req: Request, res: Response, next: NextFunction) {
  const { userId, postId } = req.body;

  try {
    const existingLike = await db.query.like.findFirst({
      columns: {
        id: true,
        userId: true,
        postId: true,
      },
      where: and(eq(userId, like.userId), eq(postId, like.postId)),
    });

    if (existingLike) {
      await db.delete(like).where(eq(like.id, existingLike.id));
      return res.status(200).json({ message: 'Like removed' });
    } else {
      const newLike = await db.insert(like).values({ userId, postId }).returning();
      return res.status(200).json(newLike);
    }
  } catch (error) {
    return next(new ErrorWithCode(500, 'Error liking'));
  }
}

export async function addComment(req: Request, res: Response, next: NextFunction) {
  const { userId, postId, text } = req.body;

  if (!userId || !postId || !text) {
    return next(new ErrorWithCode(400, 'Bad request'));
  }

  try {
    const newComment = await db.insert(comment).values({ text, userId, postId }).returning();
    return res.status(200).json(newComment);
  } catch (error) {
    console.log(error);
    return next(new ErrorWithCode(500, 'Error commenting'));
  }
}

export async function fetchComment(req: Request, res: Response, next: NextFunction) {
  const postId = req.query.postId;
  try {
    const results = await db.query.comment.findMany({
      columns: {
        userId: false,
        postId: false,
      },
      with: {
        user: {
          columns: {
            photoUrl: true,
            username: true,
          },
        },
      },
      where: eq(comment.postId, `${postId}`),
    });

    if (results.length === 0) {
      return res.status(200).json(null);
    }

    return res.status(200).json(results);
  } catch (error) {
    return next(new ErrorWithCode(500, 'Error fetching comments'));
  }
}

export async function fetchBookmark(req: Request, res: Response, next: NextFunction) {
  const userId = req.query.userId;
  try {
    const results = await db.query.bookmark.findMany({
      columns: {
        id: true,
        postId: false,
        userId: false,
        createdAt: false,
      },
      with: {
        post: {
          columns: {
            content: false,
          },
        },
        user: {
          columns: {
            username: true,
            photoUrl: true,
          },
        },
      },
      where: eq(bookmark.userId, `${userId}`),
    });

    if (results.length === 0) {
      return res.status(200).json(null);
    }

    return res.status(200).json(results);
  } catch (error) {
    return next(new ErrorWithCode(500, 'Error fetching bookmarks'));
  }
}

export async function toggleBookmark(req: Request, res: Response, next: NextFunction) {
  const { userId, postId } = req.body;

  try {
    const existingBookmark = await db.query.bookmark.findFirst({
      columns: {
        id: true,
        postId: true,
      },
      where: and(eq(userId, bookmark.userId), eq(postId, bookmark.postId)),
    });

    if (existingBookmark) {
      await db.delete(bookmark).where(eq(bookmark.id, existingBookmark.id));
      return res.status(200).json({ message: 'Bookmark removed' });
    } else {
      const newBookmark = await db.insert(bookmark).values({ userId, postId }).returning();
      return res.status(200).json(newBookmark);
    }
  } catch (error) {
    return next(new ErrorWithCode(500, 'Error bookmarking'));
  }
}

export async function getFollower() {}
export async function toggleUserFollow(req: Request, res: Response, next: NextFunction) {
  const { followerID, followingID } = req.body;

  try {
    const existingFollow = await db.query.follow.findFirst({
      columns: {
        followerId: true,
        followingId: true,
      },
      where: and(eq(follow.followerId, followerID)),
    });

    if (existingFollow) {
      await db.delete(follow).where(eq(bookmark.id, existingFollow.followerId));
      return res.status(200).json({ message: 'Follow removed' });
    } else {
      const newFollow = await db.insert(follow).values({ followerId: followerID, followingId: followingID }).returning();
      return res.status(200).json(newFollow);
    }
  } catch (error) {
    return next(new ErrorWithCode(500, 'Error following'));
  }
}
