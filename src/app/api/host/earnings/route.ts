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

    const completedBookings = await prisma.booking.findMany({
      where: {
        property: { hostId: host.id },
        bookingStatus: 'COMPLETED'
      }
    });

    const totalEarnings = completedBookings.reduce((sum, booking) => sum + booking.basePrice, 0);

    return NextResponse.json({ 
      success: true, 
      earnings: {
        total: totalEarnings,
        currency: 'NPR',
        completedBookings: completedBookings.length
      } 
    });
  } catch (error) {
    return errorResponse(error);
  }
}
