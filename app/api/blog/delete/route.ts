import { NextResponse } from 'next/server';
import { deletePostBySlug } from '@/db/queries';
import { parse } from 'cookie';

export async function DELETE(request: Request) {
  try {
    const cookies = parse(request.headers.get('cookie') || '');
    if (cookies.auth !== 'true') {
      return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

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
