/**
 * Dayte Platform Configuration
 * All business rules are configurable — never hard-coded.
 */

export const platformConfig = {
  /** Platform fee percentage charged to hosts */
  platformFeePercent: Number(process.env.PLATFORM_FEE_PERCENT || 10),

  /** Service fee percentage charged to guests */
  serviceFeePercent: Number(process.env.SERVICE_FEE_PERCENT || 5),

  /** Tax rate percentage (e.g., Nepal VAT) */
  taxRatePercent: Number(process.env.TAX_RATE_PERCENT || 13),

  /** Minimum booking duration in hours */
  minBookingDurationHours: Number(process.env.MIN_BOOKING_DURATION_HOURS || 1),

  /** Maximum booking duration in hours */
  maxBookingDurationHours: Number(process.env.MAX_BOOKING_DURATION_HOURS || 24),

  /** How long to hold inventory while payment is processing (minutes) */
  bookingHoldMinutes: Number(process.env.BOOKING_HOLD_MINUTES || 10),

  /** Hours before check-in that free cancellation is allowed */
  cancellationWindowHours: Number(process.env.CANCELLATION_WINDOW_HOURS || 2),

  /** Minimum age to use the platform */
  guestMinAge: Number(process.env.GUEST_MIN_AGE || 18),

  /** OTP expiry in minutes */
  otpExpiryMinutes: Number(process.env.OTP_EXPIRY_MINUTES || 5),

  /** Maximum OTP verification attempts */
  otpMaxAttempts: Number(process.env.OTP_MAX_ATTEMPTS || 5),

  /** Currency code */
  currency: 'NPR' as const,

  /** Currency symbol */
  currencySymbol: 'Rs.',

  /** Application name */
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'Dayte',

  /** Application URL */
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
} as const;

export type PlatformConfig = typeof platformConfig;
