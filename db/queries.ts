import { db } from ".";
import { blog, NewBlog } from "./schema";
import { cookies } from 'next/headers';

import { and, eq, isNull } from 'drizzle-orm';
import { verifyToken } from "@/server/auth/session";
import { users } from "./schema";

export async function createPost(post: NewBlog) {
  return db.insert(blog).values(post).returning();
}

export async function getAllPosts() {
  return db.select().from(blog);
}

export async function getPostBySlug(slug: string) {
  return db.select().from(blog).where(eq(blog.slug, slug));
}

export async function updatePost(slug: string, post: Partial<NewBlog>) {
  return db.update(blog).set(post).where(eq(blog.slug, slug)).returning();
}

export async function deletePostBySlug(slug: string) {
  return db.delete(blog).where(eq(blog.slug, slug)).returning();
}
export async function getUser() {
  const sessionCookie = (await cookies()).get('session');
  if (!sessionCookie?.value) {
    return null;
  }
  const sessionData = await verifyToken(sessionCookie.value);
  if (
    !sessionData?.user ||
    typeof sessionData.user.id !== 'number'
  ) {
    return null;
  }
  if (new Date(sessionData.expires) < new Date()) {
    return null;
  }
  const user = await db
    .select()
    .from(users)
    .where(and(eq(users.id, sessionData.user.id), isNull(users.deletedAt)))
    .limit(1);

  if (user.length === 0) {
    return null;
  }
  return user[0];
}

