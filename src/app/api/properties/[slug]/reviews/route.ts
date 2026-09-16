import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/middleware';
import { createReviewSchema } from '@/lib/validations';
import { errorResponse, Errors } from '@/lib/errors';
import prisma from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const resolvedParams = await params;
    const property = await prisma.property.findUnique({ where: { slug: resolvedParams.slug } });
    if (!property) throw Errors.notFound('Property not found');

    const reviews = await prisma.review.findMany({
      where: { propertyId: property.id, status: 'ACTIVE' },
      include: {
        guest: { select: { profile: { select: { firstName: true, avatarUrl: true } } } }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, reviews });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await requireAuth();
    const resolvedParams = await params;

    const property = await prisma.property.findUnique({ where: { slug: resolvedParams.slug } });
    if (!property) throw Errors.notFound('Property not found');

    const body = await request.json();
    const result = createReviewSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: { message: 'Invalid input', details: result.error.issues } }, { status: 400 });
    }

    // Verify user actually completed a booking here
    const booking = await prisma.booking.findFirst({
      where: {
        id: result.data.bookingId,
        guestId: session.user.id,
        propertyId: property.id,
        bookingStatus: 'COMPLETED'
      }
    });

    if (!booking) {
      throw Errors.forbidden('You can only review properties you have completed a stay at');
    }

    // Check if already reviewed
    const existing = await prisma.review.findUnique({ where: { bookingId: booking.id } });
    if (existing) {
      throw Errors.conflict('You have already reviewed this booking');
    }

    const review = await prisma.review.create({
      data: {
        bookingId: booking.id,
        guestId: session.user.id,
        propertyId: property.id,
        rating: result.data.rating,
        cleanliness: result.data.cleanliness,
        accuracy: result.data.accuracy,
        checkinRating: result.data.checkinRating,
        location: result.data.location,
        value: result.data.value,
        comment: result.data.comment
      }
    });

    return NextResponse.json({ success: true, review }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
