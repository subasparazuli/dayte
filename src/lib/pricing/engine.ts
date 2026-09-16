import prisma from '@/lib/db';
import { PriceBreakdown } from './types';

const TAX_RATE = 0.13; // 13% VAT
const SERVICE_FEE_RATE = 0.05; // 5% Service Fee

export class PricingEngine {
  static async calculatePrice(
    spaceId: string,
    startDatetime: Date,
    durationHours: number
  ): Promise<PriceBreakdown> {
    
    // In a real implementation, we would evaluate pricing rules (peak, weekend, etc.)
    // based on startDatetime and duration.
    // For MVP, we get the highest priority active rule or fallback to standard.
    
    const rules = await prisma.pricingRule.findMany({
      where: { spaceId, isActive: true },
      orderBy: { priority: 'desc' }
    });

    if (rules.length === 0) {
      throw new Error('No pricing rules found for this space');
    }

    const applicableRule = rules[0]; // Simplification for MVP
    
    const basePrice = applicableRule.pricePerHour * durationHours;
    const taxes = Math.round(basePrice * TAX_RATE);
    const serviceFee = Math.round(basePrice * SERVICE_FEE_RATE);
    const discount = 0; // Extensibility point for promo codes
    const totalAmount = basePrice + taxes + serviceFee - discount;

    return {
      basePrice,
      taxes,
      serviceFee,
      discount,
      totalAmount,
      currency: 'NPR'
    };
  }
}
