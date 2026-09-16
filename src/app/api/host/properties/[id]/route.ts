import { NextRequest, NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/middleware';
import { createPropertySchema } from '@/lib/validations';
import { errorResponse, Errors } from '@/lib/errors';
import { Role } from '@/lib/auth/types';
import prisma from '@/lib/db';

async function verifyPropertyOwnership(propertyId: string, userId: string) {
  const host = await prisma.host.findUnique({ where: { userId } });
  if (!host) throw Errors.forbidden('Host profile not found');

  const property = await prisma.property.findUnique({
    where: { id: propertyId }
  });

  if (!property || property.hostId !== host.id) {
    throw Errors.forbidden('You do not own this property');
  }

  return property;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireRole([Role.HOST, Role.ADMIN]);
    const resolvedParams = await params;
    
    const property = await verifyPropertyOwnership(resolvedParams.id, session.user.id);
    
    return NextResponse.json({ success: true, property });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireRole([Role.HOST, Role.ADMIN]);
    const resolvedParams = await params;
    
    await verifyPropertyOwnership(resolvedParams.id, session.user.id);

    const body = await request.json();
    const result = createPropertySchema.partial().safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: { message: 'Invalid input', details: result.error.issues } }, { status: 400 });
    }

    const updatedProperty = await prisma.property.update({
      where: { id: resolvedParams.id },
      data: result.data
    });

    return NextResponse.json({ success: true, property: updatedProperty });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireRole([Role.HOST, Role.ADMIN]);
    const resolvedParams = await params;
    
    await verifyPropertyOwnership(resolvedParams.id, session.user.id);

    await prisma.property.delete({
      where: { id: resolvedParams.id }
    });

    return NextResponse.json({ success: true, message: 'Property deleted' });
  } catch (error) {
    return errorResponse(error);
  }
}
