import { NextRequest, NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/middleware';
import { errorResponse, Errors } from '@/lib/errors';
import { Role } from '@/lib/auth/types';
import prisma from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await requireRole([Role.HOST, Role.ADMIN]);
    const host = await prisma.host.findUnique({ where: { userId: session.user.id } });
    if (!host) throw Errors.forbidden('Host profile not found');

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');

    const bookings = await prisma.booking.findMany({
      where: {
        property: {
          hostId: host.id
        },
        ...(status ? { bookingStatus: status } : {})
      },
      include: {
        space: { select: { name: true } },
        property: { select: { name: true } },
        guest: { select: { profile: { select: { firstName: true, lastName: true } } } }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    return errorResponse(error);
  }
}
