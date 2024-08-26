import { Request, Response, NextFunction } from "express";
import { ErrorWithCode } from "../lib/custom-error";

import { db } from "../db/db";
import { user, post, tag, postTags } from "../db/schema";
import { eq, inArray } from "drizzle-orm";

export default async function createNewPost(req:Request, res:Response, next:NextFunction){
  const authorId = req.body.author;
  const title = req.body.title;
  const posterUrl = req.body.posterUrl;
  const slug = req.body.slug;
  const tagList: string[] = req.body.tagList;
  const description = req.body.description;
  const content = req.body.content;

  if(!title || !posterUrl || !slug || !description || !content){
    return next(new ErrorWithCode(400, 'Please fill out all required field'));
  }
  
  try {
    const existingUser = await db.select().from(user).where(eq(user.id, authorId));
    if(!existingUser){
    return next(new ErrorWithCode(400, 'Not allowed to create post'));
  }

  const newPost = {
    authorId: authorId,
    title: title,
    description: description,
    content: content,
    slug: slug,
    poster: posterUrl,
  }

  const existingTags = await db.select().from(tag).where(inArray(tag.name, tagList));
  
  const existingTagNames = existingTags.map(tag => tag.name);
  const missingTags = tagList.filter(tagList => !existingTagNames.includes(tagList));
  
  if (missingTags.length > 0) {
    await Promise.all(missingTags.map(tagName => db.insert(tag).values({
      name: tagName,
      slug: tagName
    })));
  }
  
  const newPostId = await db.insert(post).values(newPost).returning({id: post.id});

  const updatedTags = await db.select().from(tag).where(inArray(tag.name, tagList));
    await Promise.all(updatedTags.map(tag => db.insert(postTags).values({
      postId: newPostId[0].id,
      tagId: tag.id,
    })));

  return res.status(200).json({message: 'Post created'})

  } catch (error) {
    return new ErrorWithCode(500, 'Error creating new post');
  }
}