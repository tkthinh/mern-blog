import { relations } from 'drizzle-orm';
import { pgTable, uuid, varchar, timestamp, text } from 'drizzle-orm/pg-core'

export const user = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: varchar('name').unique().notNull(),
  email: varchar('email').unique().notNull(),
  password: varchar('password').notNull(),
  photoUrl: varchar('photoUrl').$default(() =>'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
  createdAt: timestamp('created_at').defaultNow()
});

export const post = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title').notNull(),
  description: varchar('description', {length: 500}).notNull(),
  content: text('content').notNull(),
  authorId: uuid('author_id').references(() => user.id).notNull(),
  slug: varchar('slug').notNull(),
  poster: varchar('poster').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const comment = pgTable('comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  text: varchar('text').notNull(),
  userId: uuid('user_id').references(() => user.id).notNull(),
  postId: uuid('post_id').references(() => post.id).notNull(),
  createdAt: timestamp('created_at').defaultNow()
});

export const like = pgTable('likes', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => user.id).notNull(),
  postId: uuid('post_id').references(() => post.id).notNull(),
  createdAt: timestamp('created_at').defaultNow()
});

export const follow = pgTable('follows', {
  followerId: uuid('follower_id').notNull().references(() => user.id),
  followingId: uuid('following_id').notNull().references(() => user.id),
  createdAt: timestamp('created_at').defaultNow()
}, (table) => ({
  primaryKey: [table.followerId, table.followingId]
}));


  export const tag = pgTable('tags', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name').notNull(),
    slug: varchar('slug').notNull()
  });

  export const postTags = pgTable('posts_tags', {
    postId: uuid('post_id').references(() => post.id).notNull(),
    tagId: uuid('tag_id').references(() => tag.id).notNull(),
  });

export const bookmark = pgTable('bookmarks', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => user.id).notNull(),
  postId: uuid('post_id').references(() => post.id).notNull(),
  createdAt: timestamp('created_at').defaultNow()
});

// ------------------ Relations ------------------

export const userRelations = relations(user, ({ many }) => ({
  posts: many(post),
  comments: many(comment),
  likes: many(like),
  followersRelation: many(follow, { relationName: 'followers' }),
  followingRelation: many(follow, { relationName: 'following' }),
  bookmarks: many(bookmark)
}));

export const postRelations = relations(post, ({ one, many }) => ({
  author: one(user, {
    fields: [post.authorId],
    references: [user.id],
  }),
  comments: many(comment),
  likes: many(like),
  postTags: many(postTags),
  bookmarks: many(bookmark)
}));

export const commentRelations = relations(comment, ({ one }) => ({
  user: one(user, {
    fields: [comment.userId],
    references: [user.id],
  }),
  post: one(post, {
    fields: [comment.postId],
    references: [post.id],
  }),
}));

export const likeRelations = relations(like, ({ one }) => ({
  user: one(user, {
    fields: [like.userId],
    references: [user.id],
  }),
  post: one(post, {
    fields: [like.postId],
    references: [post.id],
  }),
}));

export const followRelations = relations(follow, ({ one }) => ({
  follower: one(user, {
    fields: [follow.followerId],
    references: [user.id],
  }),
  following: one(user, {
    fields: [follow.followingId],
    references: [user.id],
  }),
}));

export const tagRelations = relations(tag, ({ many }) => ({
  postTags: many(postTags),
}));

export const postTagsRelations = relations(postTags, ({ one }) => ({
  post: one(post, {
    fields: [postTags.postId],
    references: [post.id],
  }),
  tag: one(tag, {
    fields: [postTags.tagId],
    references: [tag.id],
  }),
}));

export const bookmarkRelations = relations(bookmark, ({ one }) => ({
  user: one(user, {
    fields: [bookmark.userId],
    references: [user.id],
  }),
  post: one(post, {
    fields: [bookmark.postId],
    references: [post.id],
  }),
}));