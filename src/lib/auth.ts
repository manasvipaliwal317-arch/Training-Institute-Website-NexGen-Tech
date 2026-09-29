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

const STUDENT_COOKIE_NAME = 'student_auth_session';

export async function createStudentSession(studentId: string, email: string) {
  const token = await new SignJWT({ studentId, email, role: 'STUDENT' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET_KEY);

  const cookieStore = await cookies();
  cookieStore.set(STUDENT_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days session
    path: '/',
  });

  return token;
}

export async function getStudentSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(STUDENT_COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as { studentId: string; email: string; role: string };
  } catch {
    return null;
  }
}

export async function removeStudentSession() {
  const cookieStore = await cookies();
  cookieStore.set(STUDENT_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    expires: new Date(0),
    path: '/',
  });
  try {
    cookieStore.delete(STUDENT_COOKIE_NAME);
  } catch {
    // ignore
  }
}

const FACULTY_COOKIE_NAME = 'faculty_auth_session';

export async function createFacultySession(facultyNo: string, email: string) {
  const token = await new SignJWT({ facultyNo, email, role: 'FACULTY' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET_KEY);

  const cookieStore = await cookies();
  cookieStore.set(FACULTY_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days session
    path: '/',
  });

  return token;
}

export async function getFacultySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(FACULTY_COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as { facultyNo: string; email: string; role: string };
  } catch {
    return null;
  }
}

export async function removeFacultySession() {
  const cookieStore = await cookies();
  cookieStore.set(FACULTY_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    expires: new Date(0),
    path: '/',
  });
  try {
    cookieStore.delete(FACULTY_COOKIE_NAME);
  } catch {
    // ignore
  }
}
