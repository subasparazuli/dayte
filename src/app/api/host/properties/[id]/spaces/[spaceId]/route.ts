import { NextRequest, NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/middleware';
import { createSpaceSchema } from '@/lib/validations';
import { errorResponse, Errors } from '@/lib/errors';
import { Role } from '@/lib/auth/types';
import prisma from '@/lib/db';

async function verifySpaceOwnership(propertyId: string, spaceId: string, userId: string) {
  const host = await prisma.host.findUnique({ where: { userId } });
  if (!host) throw Errors.forbidden();

  const property = await prisma.property.findFirst({
    where: { id: propertyId, hostId: host.id }
  });
  if (!property) throw Errors.forbidden('You do not own this property');

  const space = await prisma.space.findFirst({
    where: { id: spaceId, propertyId }
  });
  if (!space) throw Errors.notFound('Space not found');

  return space;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string, spaceId: string }> }
) {
  try {
    const session = await requireRole([Role.HOST, Role.ADMIN]);
    const resolvedParams = await params;
    
    const space = await verifySpaceOwnership(resolvedParams.id, resolvedParams.spaceId, session.user.id);
    return NextResponse.json({ success: true, space });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string, spaceId: string }> }
) {
  try {
    const session = await requireRole([Role.HOST, Role.ADMIN]);
    const resolvedParams = await params;
    
    await verifySpaceOwnership(resolvedParams.id, resolvedParams.spaceId, session.user.id);

    const body = await request.json();
    const result = createSpaceSchema.partial().safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: { message: 'Invalid input', details: result.error.issues } }, { status: 400 });
    }

    const space = await prisma.space.update({
      where: { id: resolvedParams.spaceId },
      data: result.data
    });

    return NextResponse.json({ success: true, space });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string, spaceId: string }> }
) {
  try {
    const session = await requireRole([Role.HOST, Role.ADMIN]);
    const resolvedParams = await params;
    
    await verifySpaceOwnership(resolvedParams.id, resolvedParams.spaceId, session.user.id);

    await prisma.space.delete({
      where: { id: resolvedParams.spaceId }
    });

    return NextResponse.json({ success: true, message: 'Space deleted' });
  } catch (error) {
    return errorResponse(error);
  }
}
