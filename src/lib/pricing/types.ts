export interface PriceBreakdown {
  basePrice: number; // in paisa
  taxes: number;     // in paisa
  serviceFee: number; // in paisa
  discount: number;  // in paisa
  totalAmount: number; // in paisa
  currency: string;
}
