export interface WalletMaster {
  id: number;
  userId: number;
  balance: number;
  loyaltyLevelId?: number;
  lastUpdated: Date;
}


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
}

export interface TransactionMaster {
  id: number;
  walletId: number;
  amount: number;
  type: 'CREDIT' | 'DEBIT';
  description: string;
  date: Date;
}
export interface LoyaltyLevel {
  id: number;
  levelName: string;
  minPoints: number;
  benefits: string;
}
