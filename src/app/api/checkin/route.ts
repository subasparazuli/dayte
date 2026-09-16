import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/middleware';
import { CheckinManager } from '@/lib/checkin/manager';
import { errorResponse, Errors } from '@/lib/errors';

// POST to verify PIN
export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth();
    const body = await request.json();
    const { bookingId, pin } = body;

    if (!bookingId || !pin) {
      return NextResponse.json({ error: { message: 'bookingId and pin are required' } }, { status: 400 });
    }

    await CheckinManager.verifyCredential(bookingId, pin);

    return NextResponse.json({ success: true, message: 'Check-in successful' });
  } catch (error) {
    return errorResponse(error);
  }
}
