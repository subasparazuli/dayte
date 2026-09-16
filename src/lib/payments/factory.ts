import { PaymentProvider } from './types';
import { MockPaymentProvider } from './mock';
import { KhaltiProvider } from './khalti';
import { EsewaProvider } from './esewa';

export function getPaymentProvider(providerName: string): PaymentProvider {
  switch (providerName.toUpperCase()) {
    case 'KHALTI':
      return new KhaltiProvider();
    case 'ESEWA':
      return new EsewaProvider();
    case 'MOCK':
    default:
      return new MockPaymentProvider();
  }
}
