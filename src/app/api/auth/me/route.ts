import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/middleware';
import { errorResponse } from '@/lib/errors';
import prisma from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await requireAuth();

    const userProfile = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { profile: true, host: true }
    });

    if (!userProfile) {
      return NextResponse.json({ error: { message: 'User not found' } }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: userProfile.id,
        role: userProfile.role,
        phone: userProfile.phone,
        email: userProfile.email,
        profile: userProfile.profile,
        hostStatus: userProfile.host?.approvalStatus
      }
    });
  } catch (error) {
    return errorResponse(error);
  }
}
