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

    const bookings = await prisma.booking.findMany({
      where: status ? { bookingStatus: status } : {},
      include: {
        guest: { select: { phone: true, profile: { select: { firstName: true, lastName: true } } } },
        property: { select: { name: true } },
        space: { select: { name: true } }
      },
      orderBy: { createdAt: 'desc' },
      take: 100
    });

    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    return errorResponse(error);
  }
}
