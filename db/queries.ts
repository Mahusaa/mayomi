import { db } from ".";
import { blog, NewBlog } from "./schema";
import { eq } from "drizzle-orm";

export async function createPost(post: NewBlog) {
  return db.insert(blog).values(post).returning();
}

export async function getAllPosts() {
  return db.select().from(blog);
}

export async function getPostBySlug(slug: string) {
  return db.select().from(blog).where(eq(blog.slug, slug));
}
