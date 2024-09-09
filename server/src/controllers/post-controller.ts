import { Request, Response, NextFunction } from 'express';
import { ErrorWithCode } from '../lib/custom-error';

import { db } from '../db/db';
import { user, post, tag, postTags, bookmark } from '../db/schema';
import { eq, inArray, desc, sql, like } from 'drizzle-orm';

export async function fetchAllPosts(req: Request, res: Response, next: NextFunction) {
  try {
    const startIndex = parseInt(`${req.query.startIndex}`) || 0;
    const limit = parseInt(`${req.query.limit}`) || 6;

    const userId = req.query.userId;

    const results = await db.query.post.findMany({
      columns: {
        id: true,
        title: true,
        poster: true,
        createdAt: true,
        description: true,
      },
      with: {
        author: {
          columns: {
            id: true,
            username: true,
            photoUrl: true,
          },
        },
        postTags: {
          columns: {
            tagId: true,
          },
          with: {
            tag: {
              columns: {
                name: true,
              },
            },
          },
        },
        bookmarks: userId
          ? {
              columns: {
                id: true,
              },
              where: eq(bookmark.userId, `${userId}`),
            }
          : undefined,
      },
      orderBy: [desc(post.createdAt)],
      limit: limit,
      offset: startIndex,
    });

    if (!results) {
      return res.status(401).json({ message: 'No post found' });
    }

    const [{ count }] = await db
      .select({ count: sql<number>`cast(count(distinct ${post.id}) as int)` })
      .from(post);

    res.status(200).json({
      results,
      count,
    });
  } catch (error) {
    return next(new ErrorWithCode(500, 'Error fetching posts'));
  }
}

export async function fetchOnePost(req: Request, res: Response, next: NextFunction) {
  const param = req.params.id;

  try {
    const paramIsId = param.match(/^[0-9a-f-]{36}$/);

    let whereClause;
    if (paramIsId) {
      whereClause = sql`${post.id} = ${param}`;
    } else {
      whereClause = sql`${post.slug} = ${param}`;
    }

    const result = await db.query.post.findFirst({
      columns: {
        id: true,
        title: true,
        content: true,
        poster: true,
        createdAt: true,
      },
      with: {
        author: {
          columns: {
            id: true,
            username: true,
            photoUrl: true,
          },
        },
        postTags: {
          columns: {
            tagId: true,
          },
          with: {
            tag: {
              columns: {
                name: true,
              },
            },
          },
        },
      },
      where: whereClause,
    });

    if (!result) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(result);
  } catch (error) {
    return next(new ErrorWithCode(500, 'Error fetching post'));
  }
}

export async function searchPosts(req: Request, res: Response, next: NextFunction) {
  const { userId, tagId, name } = req.query;

  try {
    const results = await db.query.post.findMany({
      columns: {
        id: true,
        title: true,
        poster: true,
        description: true,
        authorId: true,
        createdAt: true,
      },
      with: {
        author: {
          columns: {
            id: true,
            username: true,
            photoUrl: true,
          },
        },
        postTags: {
          columns: {
            tagId: true,
          },
          with: {
            tag: {
              columns: {
                name: true,
              },
            },
          },
        },
      },
      where: (post, { and }) => {
        const conditions = [];

        if (userId) {
          conditions.push(sql`${post.authorId} = ${userId}`);
        }

        if (tagId) {
          const tagIds = db
            .select({ id: tag.id })
            .from(tag)
            .where(eq(tag.id, `${tagId}`));

          conditions.push(
            inArray(
              post.id,
              db
                .select({ postId: postTags.postId })
                .from(postTags)
                .where(inArray(postTags.tagId, tagIds))
            )
          );
        }

        if (name) {
          conditions.push(like(post.title, `%${name}%`));
        }

        return conditions.length > 0 ? and(...conditions) : undefined;
      },
    });

    return res.status(200).json({ results });
  } catch (error) {
    return next(new ErrorWithCode(500, 'Error searching posts'));
  }
}

export async function createNewPost(req: Request, res: Response, next: NextFunction) {
  const authorId = req.body.author;
  const title = req.body.title;
  const posterUrl = req.body.posterUrl;
  const slug = req.body.slug;
  const tagList: string[] = req.body.tagList;
  const description = req.body.description;
  const content = req.body.content;

  if (!title || !posterUrl || !slug || !description || !content) {
    return next(new ErrorWithCode(400, 'Please fill out all required field'));
  }

  try {
    const existingUser = await db.select().from(user).where(eq(user.id, authorId));
    if (!existingUser) {
      return next(new ErrorWithCode(400, 'Not allowed to create post'));
    }

    const newPost = {
      authorId: authorId,
      title: title,
      description: description,
      content: content,
      slug: slug,
      poster: posterUrl,
    };

    const existingTags = await db.select().from(tag).where(inArray(tag.name, tagList));

    const existingTagNames = existingTags.map((tag) => tag.name);
    const missingTags = tagList.filter((tagList) => !existingTagNames.includes(tagList));

    if (missingTags.length > 0) {
      await Promise.all(
        missingTags.map((tagName) =>
          db.insert(tag).values({
            name: tagName,
            slug: tagName,
          })
        )
      );
    }

    const result = await db.insert(post).values(newPost).returning({ id: post.id });
    const newPostId = result[0].id;

    const updatedTags = await db.select().from(tag).where(inArray(tag.name, tagList));
    await Promise.all(
      updatedTags.map((tag) =>
        db.insert(postTags).values({
          postId: newPostId,
          tagId: tag.id,
        })
      )
    );

    return res.status(201).json({
      post: result[0],
      message: 'Post created',
    });
  } catch (error) {
    return new ErrorWithCode(500, 'Error creating new post');
  }
}
