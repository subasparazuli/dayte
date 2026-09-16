import prisma from '@/lib/db';

export class AvailabilityEngine {
  static async checkAvailability(
    spaceId: string,
    startDatetime: Date,
    durationHours: number
  ): Promise<boolean> {
    
    const space = await prisma.space.findUnique({ where: { id: spaceId } });
    if (!space || !space.isActive || space.status !== 'ACTIVE') {
      return false;
    }

    const endDatetime = new Date(startDatetime);
    endDatetime.setHours(endDatetime.getHours() + durationHours);
    
    // Add cleaning buffer
    const endWithBuffer = new Date(endDatetime);
    endWithBuffer.setMinutes(endWithBuffer.getMinutes() + space.cleaningBuffer);
    
    const startWithBuffer = new Date(startDatetime);
    startWithBuffer.setMinutes(startWithBuffer.getMinutes() - space.cleaningBuffer);

    // Query existing overlapping bookings
    const overlapping = await prisma.booking.findFirst({
      where: {
        spaceId,
        bookingStatus: {
          in: ['CONFIRMED', 'CHECKIN_AVAILABLE', 'CHECKED_IN', 'PAYMENT_PENDING']
        },
        OR: [
          {
            startDatetime: { lt: endWithBuffer },
            endDatetime: { gt: startWithBuffer }
          }
        ]
      }
    });

    return !overlapping;
  }
}
