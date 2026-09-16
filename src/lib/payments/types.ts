export interface PaymentProvider {
  createPayment(bookingId: string, amount: number, returnUrl: string): Promise<{ paymentUrl: string; providerTxnId: string }>;
  verifyPayment(providerTxnId: string, amount: number): Promise<boolean>;
  getPaymentStatus(providerTxnId: string): Promise<string>;
  handleWebhook(payload: any): Promise<boolean>;
  refundPayment(providerTxnId: string, amount: number): Promise<boolean>;
}
