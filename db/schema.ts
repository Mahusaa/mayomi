// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  serial,
  pgTableCreator,
  text,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `mayomi_${name}`);


export const blog = createTable(
  'blogs', {
  id: serial().primaryKey(),
  title: varchar('title', { length: 200 }).notNull(),
  content: text('content').notNull(),
  slug: text('slug'),
  coverImage: text('cover_image'),
  imageAlt: varchar('image_alt'),
  metaTitle: varchar('meta_title', { length: 150 }),
  metaDescription: text('meta_description'),
  metaKeyword: text('meta_keyword'),
  publishedAt: timestamp('published_at', { withTimezone: true }),
}
)


export const users = createTable(
  'users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: varchar('role', { length: 20 }).notNull().default('member'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
}
);

export type Blog = typeof blog.$inferSelect;
export type NewBlog = typeof blog.$inferInsert;
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
