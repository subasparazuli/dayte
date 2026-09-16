import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, requireRole } from '@/lib/auth/middleware';
import { createPropertySchema } from '@/lib/validations';
import { errorResponse, Errors } from '@/lib/errors';
import { Role } from '@/lib/auth/types';
import prisma from '@/lib/db';

// Simple slugify function
const slugify = (text: string) => 
  text.toString().toLowerCase().trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');

export async function GET(request: NextRequest) {
  try {
    const session = await requireRole([Role.HOST, Role.ADMIN]);

    const host = await prisma.host.findUnique({ where: { userId: session.user.id } });
    if (!host) throw Errors.forbidden('Host profile not found');

    const properties = await prisma.property.findMany({
      where: { hostId: host.id },
      include: {
        spaces: true
      }
    });

    return NextResponse.json({ success: true, properties });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireRole([Role.HOST, Role.ADMIN]);

    const host = await prisma.host.findUnique({ where: { userId: session.user.id } });
    if (!host) throw Errors.forbidden('Host profile not found');

    const body = await request.json();
    const result = createPropertySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: { message: 'Invalid input', details: result.error.issues } }, { status: 400 });
    }

    let slug = slugify(result.data.name);
    // ensure slug is unique
    const existing = await prisma.property.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Math.floor(Math.random() * 1000)}`;
    }

    const property = await prisma.property.create({
      data: {
        hostId: host.id,
        slug,
        ...result.data
      }
    });

    return NextResponse.json({ success: true, property }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
