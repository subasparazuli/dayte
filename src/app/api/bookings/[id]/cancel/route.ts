import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/middleware';
import { cancelBookingSchema } from '@/lib/validations';
import { BookingEngine } from '@/lib/booking/engine';
import { errorResponse, Errors } from '@/lib/errors';
import prisma from '@/lib/db';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth();
    const resolvedParams = await params;

    const booking = await prisma.booking.findUnique({
      where: { id: resolvedParams.id }
    });

    if (!booking) throw Errors.notFound('Booking not found');
    if (booking.guestId !== session.user.id) throw Errors.forbidden('You do not own this booking');

    const body = await request.json();
    const result = cancelBookingSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: { message: 'Invalid input', details: result.error.issues } }, { status: 400 });
    }

    const cancelledBooking = await BookingEngine.cancelBooking(resolvedParams.id, result.data.reason);

    return NextResponse.json({ success: true, booking: cancelledBooking });
  } catch (error) {
    return errorResponse(error);
  }
}
