import { NextRequest, NextResponse } from 'next/server';
import { getPaymentProvider } from '@/lib/payments/factory';
import { BookingEngine } from '@/lib/booking/engine';
import { errorResponse, Errors } from '@/lib/errors';
import prisma from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const txnId = searchParams.get('txnId');
    const status = searchParams.get('status');

    if (!txnId || status !== 'success') {
      return NextResponse.redirect(new URL('/payment/failed', request.url));
    }

    const payment = await prisma.payment.findFirst({
      where: { providerTxnId: txnId }
    });

    if (!payment) throw Errors.notFound('Payment not found');
    
    if (payment.status === 'COMPLETED') {
      return NextResponse.redirect(new URL(`/bookings/${payment.bookingId}/success`, request.url));
    }

    const provider = getPaymentProvider(payment.provider);
    const isValid = await provider.verifyPayment(txnId, payment.amount);

    if (isValid) {
      // Confirm booking inside transaction
      await prisma.$transaction(async (tx) => {
        await tx.payment.update({
          where: { id: payment.id },
          data: { status: 'COMPLETED', verifiedAt: new Date() }
        });
        
        // This is safe because BookingEngine is stateless, but we'd normally pass tx
        // For MVP, we update here
        await tx.booking.update({
          where: { id: payment.bookingId },
          data: { bookingStatus: 'CONFIRMED', paymentStatus: 'PAID', holdExpiresAt: null }
        });
      });

      return NextResponse.redirect(new URL(`/bookings/${payment.bookingId}/success`, request.url));
    } else {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'FAILED', failureReason: 'Verification failed' }
      });
      return NextResponse.redirect(new URL('/payment/failed', request.url));
    }
  } catch (error) {
    return errorResponse(error);
  }
}
