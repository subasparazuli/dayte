import { NextRequest, NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/middleware';
import { errorResponse } from '@/lib/errors';
import { Role } from '@/lib/auth/types';
import prisma from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    await requireRole([Role.ADMIN]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [todayBookings, totalRevenueObj, pendingProperties] = await Promise.all([
      prisma.booking.count({
        where: { createdAt: { gte: today } }
      }),
      prisma.booking.aggregate({
        where: { bookingStatus: 'COMPLETED' },
        _sum: { totalAmount: true }
      }),
      prisma.property.count({
        where: { approvalStatus: 'PENDING' }
      })
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        todayBookings,
        revenue: totalRevenueObj._sum.totalAmount || 0,
        pendingApprovals: pendingProperties
      }
    });
  } catch (error) {
    return errorResponse(error);
  }
}
