import { BookingStatus } from './types';
import { Errors } from '@/lib/errors';

type Transitions = {
  [key in BookingStatus]?: BookingStatus[];
};

export const VALID_TRANSITIONS: Transitions = {
  [BookingStatus.DRAFT]: [BookingStatus.PAYMENT_PENDING, BookingStatus.EXPIRED, BookingStatus.CANCELLED],
  [BookingStatus.PAYMENT_PENDING]: [BookingStatus.PAYMENT_PROCESSING, BookingStatus.CONFIRMED, BookingStatus.EXPIRED, BookingStatus.CANCELLED],
  [BookingStatus.PAYMENT_PROCESSING]: [BookingStatus.CONFIRMED, BookingStatus.PAYMENT_PENDING, BookingStatus.CANCELLED],
  [BookingStatus.CONFIRMED]: [BookingStatus.CHECKIN_AVAILABLE, BookingStatus.CANCELLED],
  [BookingStatus.CHECKIN_AVAILABLE]: [BookingStatus.CHECKED_IN, BookingStatus.CANCELLED, BookingStatus.NO_SHOW],
  [BookingStatus.CHECKED_IN]: [BookingStatus.COMPLETED],
  [BookingStatus.COMPLETED]: [],
  [BookingStatus.CANCELLED]: [],
  [BookingStatus.EXPIRED]: [],
  [BookingStatus.NO_SHOW]: []
};

export function validateTransition(currentStatus: BookingStatus, newStatus: BookingStatus): void {
  const allowed = VALID_TRANSITIONS[currentStatus];
  if (!allowed || !allowed.includes(newStatus)) {
    throw Errors.conflict(`Cannot transition booking from ${currentStatus} to ${newStatus}`);
  }
}
