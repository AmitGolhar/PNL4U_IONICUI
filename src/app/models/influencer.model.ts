export interface Influencer {
  id: number;
  name: string;
  handle: string;
  avatar?: string;
  totalEarnings: number;
  currentBalance: number;
  followers: number;
  joinedAt: Date;
  role: 'INFLUENCER' | 'CLUBADMIN' | 'APPADMIN';
}



export interface Campaign {
  id: number;
  clubId: number;
  title: string;
  description: string;
  payoutAmount: number; // per conversion or fixed
  type: 'POST' | 'STORY' | 'VIDEO';
  startDate: Date;
  endDate: Date;
  applications: number; // number of influencers applied
  status: 'ACTIVE' | 'COMPLETED' | 'DRAFT';
  assignedInfluencerIds?: number[]; // ids of assigned
}


export interface Payout {
  id?: number;
  influencerId: number;
  amount: number;
  method: 'BANK' | 'UPI' | 'WALLET';
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'REJECTED';
  requestedAt?: Date;
}


