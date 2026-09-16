import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/middleware';
import { hostOnboardingSchema } from '@/lib/validations';
import { errorResponse, Errors } from '@/lib/errors';
import { Role } from '@/lib/auth/types';
import prisma from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth();

    const body = await request.json();
    const result = hostOnboardingSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: { message: 'Invalid input', details: result.error.issues } }, { status: 400 });
    }

    const existingHost = await prisma.host.findUnique({
      where: { userId: session.user.id }
    });

    if (existingHost) {
      throw Errors.conflict('You already have a host profile');
    }

    const host = await prisma.host.create({
      data: {
        userId: session.user.id,
        ...result.data,
        verificationStatus: 'PENDING',
        approvalStatus: 'PENDING',
      }
    });

    // Update user role to HOST if they aren't already
    if (session.user.role === Role.GUEST) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { role: Role.HOST }
      });
    }

    return NextResponse.json({ success: true, host });
  } catch (error) {
    return errorResponse(error);
  }
}
