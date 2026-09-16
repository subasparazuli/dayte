/**
 * User-friendly error handling for Dayte
 * Never expose stack traces, SQL errors, or internal identifiers to users.
 */

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = 500,
    code: string = 'INTERNAL_ERROR',
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

// Pre-defined error factories for common scenarios
export const Errors = {
  badRequest: (message = 'Invalid request') =>
    new AppError(message, 400, 'BAD_REQUEST'),

  unauthorized: (message = 'Please log in to continue') =>
    new AppError(message, 401, 'UNAUTHORIZED'),

  forbidden: (message = 'You do not have permission to perform this action') =>
    new AppError(message, 403, 'FORBIDDEN'),

  notFound: (message = 'The requested resource was not found') =>
    new AppError(message, 404, 'NOT_FOUND'),

  conflict: (message = 'This action conflicts with the current state') =>
    new AppError(message, 409, 'CONFLICT'),

  gone: (message = 'This resource is no longer available') =>
    new AppError(message, 410, 'GONE'),

  tooManyRequests: (message = 'Too many requests. Please try again later.') =>
    new AppError(message, 429, 'TOO_MANY_REQUESTS'),

  // Booking-specific errors
  spaceUnavailable: () =>
    new AppError('That room is no longer available for the selected time.', 409, 'SPACE_UNAVAILABLE'),

  bookingExpired: () =>
    new AppError('Your booking session has expired. Please try again.', 410, 'BOOKING_EXPIRED'),

  paymentFailed: (message = 'Payment could not be verified. Please try another payment method.') =>
    new AppError(message, 402, 'PAYMENT_FAILED'),

  paymentExpired: () =>
    new AppError('Your payment session expired. Please try again.', 410, 'PAYMENT_EXPIRED'),

  bookingNotCompleted: () =>
    new AppError('Your booking was not completed. No charges were applied.', 400, 'BOOKING_NOT_COMPLETED'),

  // Auth-specific errors
  invalidOtp: () =>
    new AppError('The code you entered is incorrect. Please try again.', 400, 'INVALID_OTP'),

  otpExpired: () =>
    new AppError('This verification code has expired. Please request a new one.', 410, 'OTP_EXPIRED'),

  otpMaxAttempts: () =>
    new AppError('Too many incorrect attempts. Please request a new code.', 429, 'OTP_MAX_ATTEMPTS'),

  accountSuspended: () =>
    new AppError('Your account has been suspended. Please contact support.', 403, 'ACCOUNT_SUSPENDED'),

  internal: (message = 'Something went wrong. Please try again later.') =>
    new AppError(message, 500, 'INTERNAL_ERROR'),
} as const;

/**
 * Create a safe error response for API routes.
 * Never sends stack traces or internal details to the client.
 */
export function errorResponse(error: unknown): Response {
  if (error instanceof AppError) {
    return Response.json(
      {
        error: {
          message: error.message,
          code: error.code,
        },
      },
      { status: error.statusCode }
    );
  }

  // Log the actual error server-side
  console.error('[Dayte Error]', error);

  // Return a generic error to the client
  return Response.json(
    {
      error: {
        message: 'Something went wrong. Please try again later.',
        code: 'INTERNAL_ERROR',
      },
    },
    { status: 500 }
  );
}
