import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'tech-academy-super-secret-jwt-key-2026-production'
);

const COOKIE_NAME = 'admin_auth_session_v2';
const LEGACY_COOKIE_NAME = 'admin_session_token';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin root route
  if (pathname === '/admin' || pathname === '/admin/') {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete(LEGACY_COOKIE_NAME);
      return response;
    }
    try {
      await jwtVerify(token, SECRET_KEY);
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    } catch {
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete(COOKIE_NAME);
      response.cookies.delete(LEGACY_COOKIE_NAME);
      return response;
    }
  }

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete(LEGACY_COOKIE_NAME);
      return response;
    }

    try {
      await jwtVerify(token, SECRET_KEY);
      return NextResponse.next();
    } catch {
      const loginUrl = new URL('/admin/login', request.url);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete(COOKIE_NAME);
      response.cookies.delete(LEGACY_COOKIE_NAME);
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
