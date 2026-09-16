import { NextRequest, NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validations';
import { generateAndStoreOtp } from '@/lib/auth/otp';
import { errorResponse } from '@/lib/errors';
import prisma from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: { message: 'Invalid input', details: result.error.issues } }, { status: 400 });
    }

    const { identifier, type } = result.data;

    // Optional rate limiting check could go here

    await generateAndStoreOtp(identifier, type);

    // If phone, check if user exists to tell frontend whether to show registration form
    let isNewUser = true;
    const existingUser = await prisma.user.findFirst({
      where: type === 'PHONE' ? { phone: identifier } : { email: identifier }
    });

    if (existingUser) {
      isNewUser = false;
    }

    return NextResponse.json({ 
      success: true, 
      message: 'OTP sent successfully',
      isNewUser 
    });
  } catch (error) {
    return errorResponse(error);
  }
}
