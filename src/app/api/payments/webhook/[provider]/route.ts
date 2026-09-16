import { NextRequest, NextResponse } from 'next/server';
import { getPaymentProvider } from '@/lib/payments/factory';
import prisma from '@/lib/db';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  try {
    const resolvedParams = await params;
    const providerName = resolvedParams.provider;
    const provider = getPaymentProvider(providerName);
    
    const body = await request.json();
    
    // Idempotency and verification check
    const isValid = await provider.handleWebhook(body);
    
    if (!isValid) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    // In a real implementation, parse txnId and update DB
    // await prisma.payment.update(...)

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
