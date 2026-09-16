import { NextRequest, NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/middleware';
import { createSpaceSchema } from '@/lib/validations';
import { errorResponse, Errors } from '@/lib/errors';
import { Role } from '@/lib/auth/types';
import prisma from '@/lib/db';

const slugify = (text: string) => 
  text.toString().toLowerCase().trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireRole([Role.HOST, Role.ADMIN]);
    const resolvedParams = await params;
    const propertyId = resolvedParams.id;
    
    // Check ownership
    const host = await prisma.host.findUnique({ where: { userId: session.user.id } });
    if (!host) throw Errors.forbidden();

    const property = await prisma.property.findFirst({
      where: { id: propertyId, hostId: host.id }
    });
    if (!property) throw Errors.forbidden('You do not own this property');

    const spaces = await prisma.space.findMany({
      where: { propertyId }
    });

    return NextResponse.json({ success: true, spaces });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireRole([Role.HOST, Role.ADMIN]);
    const resolvedParams = await params;
    const propertyId = resolvedParams.id;
    
    // Check ownership
    const host = await prisma.host.findUnique({ where: { userId: session.user.id } });
    if (!host) throw Errors.forbidden();

    const property = await prisma.property.findFirst({
      where: { id: propertyId, hostId: host.id }
    });
    if (!property) throw Errors.forbidden('You do not own this property');

    const body = await request.json();
    const result = createSpaceSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: { message: 'Invalid input', details: result.error.issues } }, { status: 400 });
    }

    let slug = slugify(result.data.name);
    // Ensure slug is unique per property
    const existing = await prisma.space.findUnique({ 
      where: { propertyId_slug: { propertyId, slug } } 
    });
    if (existing) {
      slug = `${slug}-${Math.floor(Math.random() * 1000)}`;
    }

    const space = await prisma.space.create({
      data: {
        propertyId,
        slug,
        ...result.data
      }
    });

    return NextResponse.json({ success: true, space }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
