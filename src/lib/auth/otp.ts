import prisma from '@/lib/db';
import { Errors } from '@/lib/errors';
import { logger } from '@/lib/logger';

const OTP_EXPIRY_MINUTES = 10;
const MAX_ATTEMPTS = 5;

export async function generateAndStoreOtp(identifier: string, type: 'PHONE' | 'EMAIL'): Promise<string> {
  // Generate 6-digit OTP
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + OTP_EXPIRY_MINUTES);

  await prisma.otpAttempt.create({
    data: {
      target: identifier,
      type,
      code,
      expiresAt,
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.info(`[MOCK OTP] Sent ${code} to ${identifier}`);
  }

  return code;
}

export async function verifyOtp(identifier: string, type: 'PHONE' | 'EMAIL', code: string): Promise<boolean> {
  const attempt = await prisma.otpAttempt.findFirst({
    where: {
      target: identifier,
      type,
      verified: false,
    },
    orderBy: { createdAt: 'desc' }
  });

  if (!attempt) {
    throw Errors.invalidOtp();
  }

  if (attempt.expiresAt < new Date()) {
    throw Errors.otpExpired();
  }

  if (attempt.attempts >= MAX_ATTEMPTS) {
    throw Errors.otpMaxAttempts();
  }

  if (attempt.code !== code) {
    await prisma.otpAttempt.update({
      where: { id: attempt.id },
      data: { attempts: { increment: 1 } }
    });
    throw Errors.invalidOtp();
  }

  // Mark as verified
  await prisma.otpAttempt.update({
    where: { id: attempt.id },
    data: { verified: true }
  });

  return true;
}
