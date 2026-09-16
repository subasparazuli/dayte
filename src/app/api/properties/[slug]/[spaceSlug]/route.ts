import { NextRequest, NextResponse } from 'next/server';
import { errorResponse, Errors } from '@/lib/errors';
import prisma from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string, spaceSlug: string }> }
) {
  try {
    const resolvedParams = await params;
    
    const property = await prisma.property.findUnique({
      where: { slug: resolvedParams.slug },
    });

    if (!property || !property.isActive) {
      throw Errors.notFound('Property not found');
    }

    const space = await prisma.space.findUnique({
      where: { propertyId_slug: { propertyId: property.id, slug: resolvedParams.spaceSlug } },
      include: {
        photos: { orderBy: { sortOrder: 'asc' } },
        amenities: { include: { amenity: true } },
        pricingRules: { where: { isActive: true }, orderBy: { priority: 'desc' } },
        availabilityRules: { where: { isActive: true } }
      }
    });

    if (!space || !space.isActive) {
      throw Errors.notFound('Space not found');
    }

    return NextResponse.json({ success: true, space, property: { name: property.name, slug: property.slug, type: property.propertyType } });
  } catch (error) {
    return errorResponse(error);
  }
}
