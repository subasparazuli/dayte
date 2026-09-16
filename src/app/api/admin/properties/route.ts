import { NextRequest, NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/middleware';
import { errorResponse } from '@/lib/errors';
import { Role } from '@/lib/auth/types';
import prisma from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    await requireRole([Role.ADMIN]);
    
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');

    const properties = await prisma.property.findMany({
      where: status ? { approvalStatus: status } : {},
      include: { host: { include: { user: { select: { profile: true } } } } },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, properties });
  } catch (error) {
    return errorResponse(error);
  }
}
