import { NextResponse } from 'next/server';
import { getPostBySlug, updatePost } from '@/db/queries';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  try {
    const post = await getPostBySlug(params.slug);
    if (post.length === 0) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json(post[0], { status: 200 });
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return NextResponse.json({ message: 'Error fetching post' }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = await params;
    const updatedData = await req.json();

    const updatedPost = await updatePost(slug, updatedData);

    if (updatedPost.length === 0) {
      return NextResponse.json({ message: 'Post not found or not updated' }, { status: 404 });
    }

    return NextResponse.json(updatedPost[0], { status: 200 });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ message: 'Error updating post' }, { status: 500 });
  }
}