import { PaymentProvider } from './types';
import { logger } from '@/lib/logger';

export class KhaltiProvider implements PaymentProvider {
  async createPayment(bookingId: string, amount: number, returnUrl: string): Promise<{ paymentUrl: string; providerTxnId: string }> {
    logger.info(`[Khalti] createPayment for booking ${bookingId}`);
    const txnId = `khalti_${Date.now()}`;
    // Stub implementation returning mock URL
    return {
      paymentUrl: `${returnUrl}?txnId=${txnId}&status=success`,
      providerTxnId: txnId
    };
  }

  async verifyPayment(providerTxnId: string, amount: number): Promise<boolean> {
    logger.info(`[Khalti] verifyPayment ${providerTxnId}`);
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
