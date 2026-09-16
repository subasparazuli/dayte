import { NextRequest, NextResponse } from 'next/server';
import { registerSchema } from '@/lib/validations';
import { createSession } from '@/lib/auth/session';
import { Role } from '@/lib/auth/types';
import { errorResponse, Errors } from '@/lib/errors';
import prisma from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: { message: 'Invalid input', details: result.error.issues } }, { status: 400 });
    }

    const { phone, email, firstName, lastName, isAdult } = result.data;

    if (!isAdult) {
      return NextResponse.json({ error: { message: 'Must be an adult' } }, { status: 400 });
    }

    // Check if user already exists
    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          phone ? { phone } : {},
          email ? { email } : {}
        ].filter(condition => Object.keys(condition).length > 0)
      }
    });

    if (existing) {
      throw Errors.conflict('User with this phone or email already exists');
    }

    // Create user and profile
    const user = await prisma.user.create({
      data: {
        phone,
        email,
        isAdult,
        role: Role.GUEST,
        profile: {
          create: {
            firstName,
            lastName,
            displayName: `${firstName} ${lastName}`,
          }
        }
      }
    });

    const deviceInfo = request.headers.get('user-agent') || undefined;
    const ipAddress = request.headers.get('x-forwarded-for') || undefined;

    const session = await createSession(user.id, user.role as Role, deviceInfo, ipAddress);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        role: user.role,
      },
      ...session
    });
  } catch (error) {
    return errorResponse(error);
  }
}
