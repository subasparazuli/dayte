import { z } from 'zod';

// ============================================================
// AUTH VALIDATION SCHEMAS
// ============================================================

export const phoneSchema = z
  .string()
  .min(10, 'Phone number must be at least 10 digits')
  .max(15, 'Phone number is too long')
  .regex(/^(\+977)?9[0-9]{9}$/, 'Please enter a valid Nepal phone number');

export const emailSchema = z
  .string()
  .email('Please enter a valid email address')
  .max(255);

export const otpSchema = z
  .string()
  .length(6, 'OTP must be 6 digits')
  .regex(/^[0-9]{6}$/, 'OTP must contain only numbers');

export const loginSchema = z.object({
  identifier: z.string().min(1, 'Phone or email is required'),
  type: z.enum(['PHONE', 'EMAIL']),
});

export const verifyOtpSchema = z.object({
  identifier: z.string().min(1),
  type: z.enum(['PHONE', 'EMAIL']),
  code: otpSchema,
});

export const registerSchema = z.object({
  phone: phoneSchema.optional(),
  email: emailSchema.optional(),
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  isAdult: z.literal(true, {
    message: 'You must confirm you are 18 or older',
  }),
}).refine(data => data.phone || data.email, {
  message: 'Either phone or email is required',
});

// ============================================================
// PROPERTY VALIDATION SCHEMAS
// ============================================================

export const propertyTypeEnum = z.enum([
  'HOTEL', 'GUESTHOUSE', 'APARTMENT', 'PRIVATE_ROOM', 'STUDIO', 'OTHER',
]);

export const spaceTypeEnum = z.enum([
  'HOTEL_ROOM', 'GUEST_ROOM', 'PRIVATE_ROOM', 'APARTMENT', 'STUDIO',
  'MEETING_ROOM', 'REST_ROOM', 'SERVICED_ROOM', 'OTHER',
]);

export const locationPrivacyEnum = z.enum([
  'PUBLIC_EXACT', 'PUBLIC_APPROXIMATE', 'HIDDEN_UNTIL_BOOKED',
]);

export const createPropertySchema = z.object({
  name: z.string().min(2, 'Property name is required').max(200),
  propertyType: propertyTypeEnum,
  description: z.string().min(10, 'Description must be at least 10 characters').max(5000),
  address: z.string().min(5, 'Address is required').max(500),
  city: z.string().min(1, 'City is required').max(100),
  district: z.string().max(100).optional(),
  province: z.string().max(100).optional(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  googlePlaceId: z.string().optional(),
  locationPrivacy: locationPrivacyEnum.default('PUBLIC_APPROXIMATE'),
  checkInPolicy: z.string().max(2000).optional(),
  checkOutPolicy: z.string().max(2000).optional(),
  houseRules: z.string().max(2000).optional(),
});

export const createSpaceSchema = z.object({
  name: z.string().min(1, 'Space name is required').max(200),
  spaceType: spaceTypeEnum,
  description: z.string().min(10, 'Description must be at least 10 characters').max(5000),
  capacity: z.number().int().min(1).max(50).default(2),
  minimumDuration: z.number().int().min(1).max(24).default(1),
  maximumDuration: z.number().int().min(1).max(72).default(24),
  cleaningBuffer: z.number().int().min(0).max(180).default(30),
  selfCheckinEnabled: z.boolean().default(true),
  checkinMethod: z.enum(['PIN', 'OTP', 'LOCKBOX', 'INSTRUCTIONS', 'QR']).default('PIN'),
});

export const pricingRuleSchema = z.object({
  name: z.string().min(1).max(100).default('Standard'),
  ruleType: z.enum(['STANDARD', 'WEEKEND', 'PEAK', 'OFF_PEAK', 'HOLIDAY']).default('STANDARD'),
  pricePerHour: z.number().int().min(100, 'Price must be at least Rs. 1').max(10000000),
  dayOfWeek: z.string().optional(),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).optional(),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).optional(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  priority: z.number().int().min(0).max(100).default(0),
});

// ============================================================
// BOOKING VALIDATION SCHEMAS
// ============================================================

export const createBookingSchema = z.object({
  spaceId: z.string().min(1, 'Space is required'),
  startDatetime: z.string().datetime({ message: 'Valid start date/time is required' }),
  durationHours: z.number().int().min(1, 'Duration must be at least 1 hour'),
  guestName: z.string().min(1, 'Name is required').max(200).optional(),
  guestPhone: z.string().optional(),
  guestEmail: z.string().email().optional(),
  specialRequests: z.string().max(1000).optional(),
});

export const cancelBookingSchema = z.object({
  reason: z.string().min(1, 'Please provide a reason').max(1000),
});

// ============================================================
// SEARCH VALIDATION SCHEMAS
// ============================================================

export const searchSchema = z.object({
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  location: z.string().max(200).optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).optional(),
  durationHours: z.number().int().min(1).max(24).optional(),
  minPrice: z.number().int().min(0).optional(),
  maxPrice: z.number().int().max(10000000).optional(),
  spaceType: spaceTypeEnum.optional(),
  amenities: z.array(z.string()).optional(),
  minRating: z.number().min(1).max(5).optional(),
  radiusKm: z.number().min(0.5).max(50).default(5),
  selfCheckin: z.boolean().optional(),
  verified: z.boolean().optional(),
  sortBy: z.enum(['relevance', 'price_asc', 'price_desc', 'nearest', 'rating', 'recommended']).default('relevance'),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(50).default(20),
});

// ============================================================
// REVIEW VALIDATION SCHEMAS
// ============================================================

export const createReviewSchema = z.object({
  bookingId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  cleanliness: z.number().int().min(1).max(5).optional(),
  accuracy: z.number().int().min(1).max(5).optional(),
  checkinRating: z.number().int().min(1).max(5).optional(),
  location: z.number().int().min(1).max(5).optional(),
  value: z.number().int().min(1).max(5).optional(),
  comment: z.string().max(2000).optional(),
});

// ============================================================
// HOST VALIDATION SCHEMAS
// ============================================================

export const hostOnboardingSchema = z.object({
  businessName: z.string().max(200).optional(),
  businessType: z.enum(['INDIVIDUAL', 'HOTEL', 'GUESTHOUSE', 'PROPERTY_MANAGER']).default('INDIVIDUAL'),
  panNumber: z.string().max(50).optional(),
  vatNumber: z.string().max(50).optional(),
  bankName: z.string().max(200).optional(),
  bankAccountNumber: z.string().max(50).optional(),
  bankAccountName: z.string().max(200).optional(),
  emergencyContact: z.string().max(20).optional(),
});

// ============================================================
// PAYMENT VALIDATION SCHEMAS
// ============================================================

export const initiatePaymentSchema = z.object({
  bookingId: z.string().min(1),
  provider: z.enum(['KHALTI', 'ESEWA', 'FONEPAY', 'MOCK']),
});

// Type exports for use throughout the application
export type LoginInput = z.infer<typeof loginSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type CreatePropertyInput = z.infer<typeof createPropertySchema>;
export type CreateSpaceInput = z.infer<typeof createSpaceSchema>;
export type PricingRuleInput = z.infer<typeof pricingRuleSchema>;
export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type SearchInput = z.infer<typeof searchSchema>;
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type HostOnboardingInput = z.infer<typeof hostOnboardingSchema>;
export type InitiatePaymentInput = z.infer<typeof initiatePaymentSchema>;
