import { NextRequest, NextResponse } from 'next/server';
import { errorResponse, Errors } from '@/lib/errors';
import prisma from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const resolvedParams = await params;
    const property = await prisma.property.findUnique({
      where: { slug: resolvedParams.slug },
      include: {
        photos: { orderBy: { sortOrder: 'asc' } },
        amenities: { include: { amenity: true } },
        spaces: {
          where: { isActive: true, status: 'ACTIVE' },
          include: {
            photos: { orderBy: { sortOrder: 'asc' }, take: 1 },
            pricingRules: true
          }
        },
        reviews: {
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: { guest: { select: { profile: { select: { firstName: true, avatarUrl: true } } } } }
        }
      }
    });

    if (!property || (!property.isActive && !property.isDemoData)) {
      throw Errors.notFound('Property not found');
    }

    // Apply location privacy
    let returnedProperty = { ...property } as any;
    if (property.locationPrivacy === 'HIDDEN_UNTIL_BOOKED' || property.locationPrivacy === 'PUBLIC_APPROXIMATE') {
      // In a real app, we would slightly offset the coordinates for PUBLIC_APPROXIMATE
      // or hide exact address if not booked by current user.
      if (property.locationPrivacy === 'HIDDEN_UNTIL_BOOKED') {
         returnedProperty.address = 'Address provided after booking confirmation';
         returnedProperty.latitude = Math.round(property.latitude * 100) / 100;
         returnedProperty.longitude = Math.round(property.longitude * 100) / 100;
      }
    }

    return NextResponse.json({ success: true, property: returnedProperty });
  } catch (error) {
    return errorResponse(error);
  }
}
