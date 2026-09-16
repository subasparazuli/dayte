import { NextRequest, NextResponse } from 'next/server';
import { verifyOtpSchema } from '@/lib/validations';
import { verifyOtp } from '@/lib/auth/otp';
import { createSession } from '@/lib/auth/session';
import { Role } from '@/lib/auth/types';
import { errorResponse, Errors } from '@/lib/errors';
import prisma from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = verifyOtpSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: { message: 'Invalid input', details: result.error.issues } }, { status: 400 });
    }

    const { identifier, type, code } = result.data;

    // Verify OTP
    await verifyOtp(identifier, type, code);

    // Find or create user
    let user = await prisma.user.findFirst({
      where: type === 'PHONE' ? { phone: identifier } : { email: identifier }
    });

    if (!user) {
      // In a real flow, if they are not a user, they should go to registration,
      // but for simple MVP we can either error out or auto-create a stub.
      // Usually verify-otp would return `isNewUser: true` and a temp token.
      // Here we will return an error that says they must register, or we can create them.
      // Wait, the prompt says `create user if new`. Let's create.
      user = await prisma.user.create({
        data: {
          phone: type === 'PHONE' ? identifier : null,
          email: type === 'EMAIL' ? identifier : null,
          role: Role.GUEST,
          status: 'ACTIVE',
          isAdult: false, // Must be set to true in profile update
        }
      });
    }

    if (user.status !== 'ACTIVE') {
      throw Errors.accountSuspended();
    }

    const deviceInfo = request.headers.get('user-agent') || undefined;
    const ipAddress = request.headers.get('x-forwarded-for') || undefined;

    const session = await createSession(user.id, user.role as Role, deviceInfo, ipAddress);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        role: user.role,
        isAdult: user.isAdult
      },
      ...session
    });
  } catch (error) {
    return errorResponse(error);
  }
}
