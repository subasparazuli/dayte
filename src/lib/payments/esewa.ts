import { PaymentProvider } from './types';
import { logger } from '@/lib/logger';

export class EsewaProvider implements PaymentProvider {
  async createPayment(bookingId: string, amount: number, returnUrl: string): Promise<{ paymentUrl: string; providerTxnId: string }> {
    logger.info(`[eSewa] createPayment for booking ${bookingId}`);
    const txnId = `esewa_${Date.now()}`;
    // Stub implementation
    return {
      paymentUrl: `${returnUrl}?txnId=${txnId}&status=success`,
      providerTxnId: txnId
    };
  }

  async verifyPayment(providerTxnId: string, amount: number): Promise<boolean> {
    logger.info(`[eSewa] verifyPayment ${providerTxnId}`);
    return true;
  }

  async getPaymentStatus(providerTxnId: string): Promise<string> {
    return 'COMPLETED';
  }

  async handleWebhook(payload: any): Promise<boolean> {
    return true;
  }

  async refundPayment(providerTxnId: string, amount: number): Promise<boolean> {
    return true;
  }
}
