import { NextResponse } from 'next/server';
import { deletePostBySlug } from '@/db/queries';

export async function DELETE(request: Request) {
  try {
    const { slug } = await request.json();

    if (!slug) {
      return new NextResponse(JSON.stringify({ message: 'Slug is required' }), { status: 400 });
    }

    await deletePostBySlug(slug);

    return new NextResponse(JSON.stringify({ message: 'Blog post deleted successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return new NextResponse(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
  }
}
