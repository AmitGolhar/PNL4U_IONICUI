export interface Referral {
  id: number;
  referrerId: number;
  referredName: string;
  joinedDate: Date;
  bonusAmount: number;
  status: 'PENDING' | 'JOINED' | 'REWARDED';
}
