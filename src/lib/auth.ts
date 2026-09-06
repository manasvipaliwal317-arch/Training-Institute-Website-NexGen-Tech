import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'tech-academy-super-secret-jwt-key-2026-production'
);

const COOKIE_NAME = 'admin_auth_session_v2';
const LEGACY_COOKIE_NAME = 'admin_session_token';

export async function createSession(email: string, role: string = 'ADMIN') {
  const token = await new SignJWT({ email, role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(SECRET_KEY);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 2, // 2 hours strict session
    path: '/',
  });

  return token;
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as { email: string; role: string };
  } catch {
    return null;
  }
}

export async function removeSession() {
  const cookieStore = await cookies();
  
  // Clear new cookie
  cookieStore.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    expires: new Date(0),
    path: '/',
  });
  try {
    cookieStore.delete(COOKIE_NAME);
  } catch {
    // fallback ignore
  }

  // Clear legacy cookie
  cookieStore.set(LEGACY_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    expires: new Date(0),
    path: '/',
  });
  try {
    cookieStore.delete(LEGACY_COOKIE_NAME);
  } catch {
    // fallback ignore
  }
}
