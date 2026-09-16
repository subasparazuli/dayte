import { NextRequest, NextResponse } from 'next/server';
import { searchSchema } from '@/lib/validations';
import { errorResponse } from '@/lib/errors';
import prisma from '@/lib/db';

// Haversine formula to calculate distance in km
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  return R * c; 
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams.entries());
    
    // Convert necessary strings to numbers/booleans for schema validation
    const parsedParams: any = { ...searchParams };
    if (parsedParams.latitude) parsedParams.latitude = parseFloat(parsedParams.latitude);
    if (parsedParams.longitude) parsedParams.longitude = parseFloat(parsedParams.longitude);
    if (parsedParams.durationHours) parsedParams.durationHours = parseInt(parsedParams.durationHours);
    if (parsedParams.minPrice) parsedParams.minPrice = parseInt(parsedParams.minPrice);
    if (parsedParams.maxPrice) parsedParams.maxPrice = parseInt(parsedParams.maxPrice);
    if (parsedParams.minRating) parsedParams.minRating = parseFloat(parsedParams.minRating);
    if (parsedParams.radiusKm) parsedParams.radiusKm = parseFloat(parsedParams.radiusKm);
    if (parsedParams.selfCheckin) parsedParams.selfCheckin = parsedParams.selfCheckin === 'true';
    if (parsedParams.verified) parsedParams.verified = parsedParams.verified === 'true';
    if (parsedParams.page) parsedParams.page = parseInt(parsedParams.page);
    if (parsedParams.limit) parsedParams.limit = parseInt(parsedParams.limit);

    if (searchParams.amenities) {
      parsedParams.amenities = searchParams.amenities.split(',');
    }

    const result = searchSchema.safeParse(parsedParams);
    if (!result.success) {
      return NextResponse.json({ error: { message: 'Invalid search parameters', details: result.error.issues } }, { status: 400 });
    }

    const query = result.data;

    // Build base prisma query
    const whereClause: any = {
      isActive: true,
      approvalStatus: 'APPROVED',
      spaces: {
        some: {
          isActive: true,
          status: 'ACTIVE',
          ...(query.spaceType ? { spaceType: query.spaceType } : {}),
          ...(query.selfCheckin !== undefined ? { selfCheckinEnabled: query.selfCheckin } : {})
        }
      }
    };

    if (query.verified) {
      whereClause.verificationStatus = 'VERIFIED';
    }

    // Get all properties matching criteria
    let properties = await prisma.property.findMany({
      where: whereClause,
      include: {
        spaces: {
          where: { isActive: true, status: 'ACTIVE' },
          include: { pricingRules: true, photos: true }
        },
        photos: true,
        reviews: { select: { rating: true } }
      }
    });

    // Filter by distance if lat/lng provided
    if (query.latitude && query.longitude) {
      properties = properties.filter(prop => {
        const dist = calculateDistance(query.latitude!, query.longitude!, prop.latitude, prop.longitude);
        (prop as any).distanceKm = dist;
        return dist <= query.radiusKm;
      });
    }

    // Sort
    if (query.sortBy === 'nearest' && query.latitude && query.longitude) {
      properties.sort((a: any, b: any) => a.distanceKm - b.distanceKm);
    }

    // Pagination
    const page = query.page || 1;
    const limit = query.limit || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginated = properties.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      meta: {
        total: properties.length,
        page,
        limit,
        pages: Math.ceil(properties.length / limit)
      },
      results: paginated.map(p => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        propertyType: p.propertyType,
        latitude: p.latitude,
        longitude: p.longitude,
        distanceKm: (p as any).distanceKm,
        spaces: p.spaces.map(s => ({
          id: s.id,
          name: s.name,
          slug: s.slug,
          spaceType: s.spaceType,
          basePrice: s.pricingRules[0]?.pricePerHour || 0
        }))
      }))
    });

  } catch (error) {
    return errorResponse(error);
  }
}
