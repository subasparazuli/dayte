import { NextRequest, NextResponse } from 'next/server';
import { invalidateSession } from '@/lib/auth/session';
import { errorResponse } from '@/lib/errors';

export async function POST(request: NextRequest) {
  try {
    await invalidateSession();
    return NextResponse.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    return errorResponse(error);
  }
}
