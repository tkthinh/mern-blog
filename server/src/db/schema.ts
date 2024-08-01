import { pgTable, uuid, varchar, timestamp, text } from 'drizzle-orm/pg-core'

const user = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: varchar('name').unique().notNull(),
  email: varchar('email').unique().notNull(),
  password: varchar('password').notNull(),
});

const post = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title').notNull(),
  content: text('content').notNull(),
  authorId: uuid('author_id').references(() => user.id).notNull(),
  slug: varchar('slug').notNull(),
  poster: varchar('poster').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

const comment = pgTable('comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  text: varchar('text').notNull(),
  userId: uuid('user_id').references(() => user.id).notNull(),
  postId: uuid('post_id').references(() => user.id).notNull(),
  createdAt: timestamp('created_at').defaultNow()
});

const like = pgTable('likes', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => user.id).notNull(),
  postId: uuid('post_id').references(() => post.id).notNull(),
  createdAt: timestamp('created_at').defaultNow()
});

const tag = pgTable('tags', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name').notNull(),
  description: varchar('description').notNull(),
  slug: varchar('slug').notNull()
});

const postTags = pgTable('posts_tags', {
  postId: uuid('post_id').references(() => post.id).notNull(),
  tagId: uuid('tag_id').references(() => tag.id).notNull(),
});

const bookmark = pgTable('bookmarks', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => user.id).notNull(),
  postId: uuid('post_id').references(() => post.id).notNull(),
  createdAt: timestamp('created_at').defaultNow()
});

module.exports = { user, post, comment, like, tag, postTags, bookmark };