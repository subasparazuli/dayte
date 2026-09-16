import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/middleware';
import { initiatePaymentSchema } from '@/lib/validations';
import { getPaymentProvider } from '@/lib/payments/factory';
import { errorResponse, Errors } from '@/lib/errors';
import prisma from '@/lib/db';
import { randomUUID } from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth();
    const body = await request.json();
    const result = initiatePaymentSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: { message: 'Invalid input', details: result.error.issues } }, { status: 400 });
    }

    const { bookingId, provider } = result.data;

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId }
    });

    if (!booking) throw Errors.notFound('Booking not found');
    if (booking.guestId !== session.user.id) throw Errors.forbidden();
    if (booking.bookingStatus !== 'PAYMENT_PENDING') throw Errors.conflict('Booking is not pending payment');

    const paymentProvider = getPaymentProvider(provider);
    const returnUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/payments/verify`;

    const { paymentUrl, providerTxnId } = await paymentProvider.createPayment(booking.id, booking.totalAmount, returnUrl);

    await prisma.payment.create({
      data: {
        bookingId: booking.id,
        provider,
        providerTxnId,
        amount: booking.totalAmount,
        idempotencyKey: randomUUID(),
        paymentUrl,
        status: 'INITIATED'
      }
    });

    return NextResponse.json({ success: true, paymentUrl });
  } catch (error) {
    return errorResponse(error);
  }
}
