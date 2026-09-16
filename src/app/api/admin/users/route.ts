import { NextRequest, NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/middleware';
import { errorResponse } from '@/lib/errors';
import { Role } from '@/lib/auth/types';
import prisma from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    await requireRole([Role.ADMIN]);
    
    const searchParams = request.nextUrl.searchParams;
    const role = searchParams.get('role');

    const users = await prisma.user.findMany({
      where: role ? { role } : {},
      include: { profile: true },
      orderBy: { createdAt: 'desc' },
      take: 100
    });

    return NextResponse.json({ success: true, users });
  } catch (error) {
    return errorResponse(error);
  }
}
