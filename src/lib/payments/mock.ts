import { PaymentProvider } from './types';
import { logger } from '@/lib/logger';

export class MockPaymentProvider implements PaymentProvider {
  async createPayment(bookingId: string, amount: number, returnUrl: string): Promise<{ paymentUrl: string; providerTxnId: string }> {
    const txnId = `mock_txn_${Date.now()}`;
    logger.info(`[MockPayment] createPayment for booking ${bookingId}`);
    return {
      paymentUrl: `${returnUrl}?txnId=${txnId}&status=success`,
      providerTxnId: txnId
    };
  }

  async verifyPayment(providerTxnId: string, amount: number): Promise<boolean> {
    logger.info(`[MockPayment] verifyPayment ${providerTxnId}`);
    return true; // Auto-success for development
  }

  async getPaymentStatus(providerTxnId: string): Promise<string> {
    return 'COMPLETED';
  }

  async handleWebhook(payload: any): Promise<boolean> {
    return true;
  }

  async refundPayment(providerTxnId: string, amount: number): Promise<boolean> {
    logger.info(`[MockPayment] refundPayment ${providerTxnId}`);
    return true;
  }
}
