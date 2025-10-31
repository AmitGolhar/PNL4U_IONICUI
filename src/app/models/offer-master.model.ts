export interface OfferMaster {
  id: number;
  clubId: number;
  title: string;
  description: string;
  discountPercent?: number;
  cashbackAmount?: number;
  startDate: Date;
  endDate: Date;
  createdBy: string;
  promoCode?: string;
}



export interface PromoCode {
  id: number;
  code: string;
  description: string;
  discountPercent: number;
  expiryDate: Date;
  usageCount: number;
  maxUsage: number;
}
