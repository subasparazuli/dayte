import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/middleware';
import { createBookingSchema } from '@/lib/validations';
import { BookingEngine } from '@/lib/booking/engine';
import { errorResponse } from '@/lib/errors';
import prisma from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await requireAuth();

    const bookings = await prisma.booking.findMany({
      where: { guestId: session.user.id },
      include: {
        property: { select: { name: true, slug: true, address: true } },
        space: { select: { name: true, slug: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth();
    
    const body = await request.json();
    const result = createBookingSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: { message: 'Invalid input', details: result.error.issues } }, { status: 400 });
    }

    const { spaceId, startDatetime, durationHours, guestName, guestPhone, guestEmail, specialRequests } = result.data;
    const start = new Date(startDatetime);

    const booking = await BookingEngine.createBooking(
      session.user.id,
      spaceId,
      start,
      durationHours,
      { name: guestName, phone: guestPhone, email: guestEmail, specialRequests }
    );

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
