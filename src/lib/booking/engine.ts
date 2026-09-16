import prisma from '@/lib/db';
import { BookingStatus, PaymentStatus } from './types';
import { validateTransition } from './states';
import { AvailabilityEngine } from './availability';
import { PricingEngine } from '@/lib/pricing/engine';
import { Errors } from '@/lib/errors';
import { logger } from '@/lib/logger';

export class BookingEngine {
  static async createBooking(
    guestId: string,
    spaceId: string,
    startDatetime: Date,
    durationHours: number,
    guestInfo?: { name?: string; phone?: string; email?: string; specialRequests?: string }
  ) {
    // 1. Check availability
    const isAvailable = await AvailabilityEngine.checkAvailability(spaceId, startDatetime, durationHours);
    if (!isAvailable) {
      throw Errors.spaceUnavailable();
    }

    // 2. Get Space and Property
    const space = await prisma.space.findUnique({
      where: { id: spaceId },
      include: { property: true }
    });
    if (!space) throw Errors.notFound('Space not found');

    // 3. Calculate price
    const priceBreakdown = await PricingEngine.calculatePrice(spaceId, startDatetime, durationHours);

    const endDatetime = new Date(startDatetime);
    endDatetime.setHours(endDatetime.getHours() + durationHours);

    // 15-minute hold for payment
    const holdExpiresAt = new Date();
    holdExpiresAt.setMinutes(holdExpiresAt.getMinutes() + 15);

    // 4. Create Draft Booking in a transaction
    return prisma.$transaction(async (tx) => {
      // Double check availability with lock (simulated in SQLite)
      // Since SQLite doesn't have true row locks, we rely on the unique overlapping check.
      const overlapping = await tx.booking.findFirst({
        where: {
          spaceId,
          bookingStatus: {
            in: ['CONFIRMED', 'PAYMENT_PENDING']
          },
          endDatetime: { gt: startDatetime },
          startDatetime: { lt: endDatetime }
        }
      });
      if (overlapping) throw Errors.spaceUnavailable();

      return tx.booking.create({
        data: {
          guestId,
          propertyId: space.propertyId,
          spaceId,
          startDatetime,
          endDatetime,
          durationHours,
          ...priceBreakdown,
          bookingStatus: BookingStatus.PAYMENT_PENDING,
          paymentStatus: PaymentStatus.UNPAID,
          holdExpiresAt,
          guestName: guestInfo?.name,
          guestPhone: guestInfo?.phone,
          guestEmail: guestInfo?.email,
          specialRequests: guestInfo?.specialRequests
        }
      });
    });
  }

  static async confirmBooking(bookingId: string) {
    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking) throw Errors.notFound('Booking not found');

    validateTransition(booking.bookingStatus as BookingStatus, BookingStatus.CONFIRMED);

    return prisma.booking.update({
      where: { id: bookingId },
      data: {
        bookingStatus: BookingStatus.CONFIRMED,
        paymentStatus: PaymentStatus.PAID,
        holdExpiresAt: null
      }
    });
  }

  static async cancelBooking(bookingId: string, reason: string, cancelledByAdmin: boolean = false) {
    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking) throw Errors.notFound('Booking not found');

    validateTransition(booking.bookingStatus as BookingStatus, BookingStatus.CANCELLED);

    return prisma.booking.update({
      where: { id: bookingId },
      data: {
        bookingStatus: BookingStatus.CANCELLED,
        cancellationReason: reason,
        cancelledAt: new Date(),
        cancellationStatus: cancelledByAdmin ? 'ADMIN_CANCELLED' : 'GUEST_CANCELLED',
        holdExpiresAt: null
      }
    });
  }

  static async expireHolds() {
    // Background job to expire holds
    const expired = await prisma.booking.updateMany({
      where: {
        bookingStatus: BookingStatus.PAYMENT_PENDING,
        holdExpiresAt: { lt: new Date() }
      },
      data: {
        bookingStatus: BookingStatus.EXPIRED,
        holdExpiresAt: null
      }
    });
    
    if (expired.count > 0) {
      logger.info(`Expired ${expired.count} abandoned bookings.`);
    }
  }
}
