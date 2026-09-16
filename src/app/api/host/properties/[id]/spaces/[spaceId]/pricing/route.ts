import { NextRequest, NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/middleware';
import { pricingRuleSchema } from '@/lib/validations';
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
    
    await verifySpaceOwnership(resolvedParams.id, resolvedParams.spaceId, session.user.id);

    const rules = await prisma.pricingRule.findMany({
      where: { spaceId: resolvedParams.spaceId }
    });
    return NextResponse.json({ success: true, rules });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string, spaceId: string }> }
) {
  try {
    const session = await requireRole([Role.HOST, Role.ADMIN]);
    const resolvedParams = await params;
    
    await verifySpaceOwnership(resolvedParams.id, resolvedParams.spaceId, session.user.id);

    const body = await request.json();
    const result = pricingRuleSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: { message: 'Invalid input', details: result.error.issues } }, { status: 400 });
    }

    const rule = await prisma.pricingRule.create({
      data: {
        spaceId: resolvedParams.spaceId,
        ...result.data
      }
    });

    return NextResponse.json({ success: true, rule }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
