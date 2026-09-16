import { SignJWT, jwtVerify } from 'jose';
import { AuthTokenPayload } from './types';

// Using a fallback for development if JWT_SECRET is not set
const getSecretKey = () => new TextEncoder().encode(process.env.JWT_SECRET || 'quickstay-super-secret-development-key');

export async function signAccessToken(payload: AuthTokenPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(getSecretKey());
}

export async function signRefreshToken(payload: AuthTokenPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecretKey());
}

export async function verifyToken(token: string): Promise<AuthTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload as unknown as AuthTokenPayload;
  } catch (error) {
    return null;
  }
}
