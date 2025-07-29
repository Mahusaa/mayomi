import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken, signToken } from './server/auth/session';

const adminRoutes = ["/editor"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('session');
  const res = NextResponse.next();

  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  // If no session and trying to access an admin route, redirect to sign-in
  if (!sessionCookie && isAdminRoute) {
    const redirectUrl = new URL('/sign-in', request.url);
    redirectUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If there's no session, allow access to public routes
  if (!sessionCookie) return res;

  try {
    const session = await verifyToken(sessionCookie.value);

    // Restrict access to admin routes
    if (isAdminRoute && session.user.role !== 'owner') {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    // Extend session expiry
    const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000);
    res.cookies.set({
      name: 'session',
      value: await signToken({ ...session, expires: expiresInOneDay.toISOString() }),
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      expires: expiresInOneDay,
    });

    return res;
  } catch (error) {
    console.error('Session invalid:', error);
    res.cookies.delete('session');
    const redirectUrl = new URL('/sign-in', request.url);
    redirectUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(redirectUrl);
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|icobulet.ico).*)'],
};
