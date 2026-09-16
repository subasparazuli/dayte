import { cookies } from 'next/headers';
import prisma from '@/lib/db';
import { signAccessToken, signRefreshToken, verifyToken } from './jwt';
import { AuthTokenPayload, Role, UserSession } from './types';
import { AppError, Errors } from '@/lib/errors';

export async function createSession(userId: string, role: Role, deviceInfo?: string, ipAddress?: string) {
  // Create refresh token
  const refreshTokenPayload: AuthTokenPayload = { userId, role, sessionId: 'temp' };
  const tempRefreshToken = await signRefreshToken(refreshTokenPayload);

  // Store session in DB
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

  const session = await prisma.session.create({
    data: {
      userId,
      token: tempRefreshToken, // We use the refresh token as the session identifier
      expiresAt,
      deviceInfo,
      ipAddress,
    },
  });

  // Now create the real tokens
  const payload: AuthTokenPayload = { userId, role, sessionId: session.id };
  const accessToken = await signAccessToken(payload);
  const refreshToken = await signRefreshToken(payload);

  // Update session with the real refresh token
  await prisma.session.update({
    where: { id: session.id },
    data: { token: refreshToken },
  });

  // Set cookies
  const cookieStore = await cookies();
  cookieStore.set('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 15 * 60, // 15 minutes
    path: '/',
  });

  cookieStore.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  });

  return { accessToken, refreshToken, sessionId: session.id };
}

export async function getSession(): Promise<UserSession | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (accessToken) {
    const payload = await verifyToken(accessToken);
    if (payload) {
      const user = await prisma.user.findUnique({
        where: { id: payload.userId, status: 'ACTIVE' },
        select: { id: true, role: true, status: true, phone: true, email: true }
      });
      if (user) {
         return {
           user: {
             id: user.id,
             role: user.role as Role,
             status: user.status,
             phone: user.phone,
             email: user.email
           },
           sessionId: payload.sessionId
         };
      }
    }
  }

  // Try to refresh
  const refreshToken = cookieStore.get('refreshToken')?.value;
  if (!refreshToken) return null;

  const refreshPayload = await verifyToken(refreshToken);
  if (!refreshPayload) return null;

  // Check DB
  const dbSession = await prisma.session.findUnique({
    where: { id: refreshPayload.sessionId, token: refreshToken },
    include: { user: true }
  });

  if (!dbSession || dbSession.expiresAt < new Date() || dbSession.user.status !== 'ACTIVE') {
    return null;
  }

  // Issue new access token
  const newPayload: AuthTokenPayload = {
    userId: dbSession.userId,
    role: dbSession.user.role as Role,
    sessionId: dbSession.id
  };
  const newAccessToken = await signAccessToken(newPayload);

  cookieStore.set('accessToken', newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 15 * 60,
    path: '/',
  });

  return {
    user: {
      id: dbSession.user.id,
      role: dbSession.user.role as Role,
      status: dbSession.user.status,
      phone: dbSession.user.phone,
      email: dbSession.user.email
    },
    sessionId: dbSession.id
  };
}

export async function invalidateSession() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (refreshToken) {
    const payload = await verifyToken(refreshToken);
    if (payload) {
      await prisma.session.deleteMany({
        where: { id: payload.sessionId }
      });
    }
  }

  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
}
