import prisma from '@/lib/db';
import { Errors } from '@/lib/errors';
import * as bcryptjs from 'bcryptjs';

export class CheckinManager {
  static async generateCredential(bookingId: string) {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { space: true }
    });

    if (!booking) throw Errors.notFound('Booking not found');
    if (booking.bookingStatus !== 'CONFIRMED') throw Errors.conflict('Booking must be confirmed to generate credential');

    // Generate PIN (e.g., 6 digits)
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    const hash = await bcryptjs.hash(pin, 10);

    const activatesAt = new Date(booking.startDatetime);
    activatesAt.setMinutes(activatesAt.getMinutes() - 30); // Active 30 mins before

    const expiresAt = new Date(booking.endDatetime);
    expiresAt.setMinutes(expiresAt.getMinutes() + 30); // Expire 30 mins after

    const credential = await prisma.checkinCredential.upsert({
      where: { bookingId },
      update: {
        credentialHash: hash,
        activatesAt,
        expiresAt,
        isUsed: false,
        isInvalidated: false
      },
      create: {
        bookingId,
        credentialType: booking.space.checkinMethod,
        credentialHash: hash,
        activatesAt,
        expiresAt
      }
    });

    return { pin, credential };
  }

  static async verifyCredential(bookingId: string, pin: string) {
    const credential = await prisma.checkinCredential.findUnique({
      where: { bookingId }
    });

    if (!credential) throw Errors.notFound('Credential not found');
    if (credential.isInvalidated) throw Errors.forbidden('Credential has been invalidated');
    
    const now = new Date();
    if (now < credential.activatesAt) throw Errors.forbidden('Check-in time has not started');
    if (now > credential.expiresAt) throw Errors.forbidden('Credential has expired');

    const isValid = await bcryptjs.compare(pin, credential.credentialHash);
    if (!isValid) throw Errors.forbidden('Invalid PIN');

    // Record check-in
    await prisma.$transaction(async (tx) => {
      await tx.checkinCredential.update({
        where: { bookingId },
        data: { isUsed: true }
      });
      await tx.booking.update({
        where: { id: bookingId },
        data: { bookingStatus: 'CHECKED_IN', checkInStatus: 'CHECKED_IN' }
      });
      await tx.checkinEvent.create({
        data: { bookingId, eventType: 'CHECKIN_SUCCESS' }
      });
    });

    return true;
  }

  static async invalidateCredential(bookingId: string) {
    return prisma.checkinCredential.update({
      where: { bookingId },
      data: { isInvalidated: true, invalidatedAt: new Date() }
    });
  }
}
