import { NextRequest, NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/middleware';
import { errorResponse, Errors } from '@/lib/errors';
import { Role } from '@/lib/auth/types';
import prisma from '@/lib/db';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireRole([Role.ADMIN]);
    const resolvedParams = await params;
    
    const body = await request.json();
    const { status } = body; // 'APPROVED' or 'REJECTED'

    if (status !== 'APPROVED' && status !== 'REJECTED') {
      return NextResponse.json({ error: { message: 'Status must be APPROVED or REJECTED' } }, { status: 400 });
    }

    const property = await prisma.property.update({
      where: { id: resolvedParams.id },
      data: {
        approvalStatus: status,
        approvedAt: new Date(),
        approvedBy: session.user.id
      }
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        actorId: session.user.id,
        action: `PROPERTY_${status}`,
        targetType: 'PROPERTY',
        targetId: property.id
      }
    });

    return NextResponse.json({ success: true, property });
  } catch (error) {
    return errorResponse(error);
  }
}
