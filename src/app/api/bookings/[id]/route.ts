import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/middleware';
import { errorResponse, Errors } from '@/lib/errors';
import prisma from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth();
    const resolvedParams = await params;

    const booking = await prisma.booking.findUnique({
      where: { id: resolvedParams.id },
      include: {
        property: { select: { name: true, slug: true, address: true, checkInPolicy: true } },
        space: { select: { name: true, slug: true, checkinMethod: true } },
        payments: true,
        checkinCredential: {
          select: {
            credentialType: true,
            instructions: true,
            activatesAt: true,
            expiresAt: true
          }
        }
      }
    });

    if (!booking) {
      throw Errors.notFound('Booking not found');
    }

    if (booking.guestId !== session.user.id) {
      throw Errors.forbidden('You do not have access to this booking');
    }

    // Hide credential instructions if not confirmed
    if (booking.bookingStatus !== 'CONFIRMED' && booking.bookingStatus !== 'CHECKIN_AVAILABLE' && booking.bookingStatus !== 'CHECKED_IN') {
      if (booking.checkinCredential) {
        booking.checkinCredential.instructions = null;
      }
    }

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    return errorResponse(error);
  }
}
