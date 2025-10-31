import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Campaign, Influencer, Payout } from '../models/influencer.model';
 
@Injectable({ providedIn: 'root' })
export class InfluencerService {
  private influencer: Influencer = {
    id: 501,
    name: 'Pune Night Life',
    handle: '@punenightlifeofficials',
    avatar: 'https://i.pravatar.cc/300',
    totalEarnings: 12500,
    currentBalance: 4200,
    followers: 54200,
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 400),
    role: 'INFLUENCER'
  };

  private campaigns: Campaign[] = [
    {
      id: 1,
      clubId: 11,
      title: 'Weekend Neon Party Promo',
      description: 'Post 1 feed + 3 stories promoting weekend neon party. Show ticket link.',
      payoutAmount: 1500,
      type: 'POST',
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 86400000),
      applications: 12,
      status: 'ACTIVE',
      assignedInfluencerIds: []
    },
    {
      id: 2,
      clubId: 22,
      title: 'Rooftop Afterparty Feature',
      description: '1 video reel with club tag. UID-based conversion tracking.',
      payoutAmount: 3000,
      type: 'VIDEO',
      startDate: new Date(),
      endDate: new Date(Date.now() + 14 * 86400000),
      applications: 5,
      status: 'ACTIVE',
      assignedInfluencerIds: [501]
    },
    {
      id: 3,
      clubId: 33,
      title: 'Loyalty Drive',
      description: 'Promote loyalty cards. Earn ₹100 per signup.',
      payoutAmount: 100,
      type: 'STORY',
      startDate: new Date(Date.now() - 21 * 86400000),
      endDate: new Date(Date.now() - 7 * 86400000),
      applications: 32,
      status: 'COMPLETED',
      assignedInfluencerIds: [501, 502]
    }
  ];

  private payouts: Payout[] = [
    {
      id: 1,
      influencerId: 501,
      amount: 2000,
      method: 'UPI',
      status: 'COMPLETED',
      requestedAt: new Date(Date.now() - 10 * 86400000)
    }
  ];

  constructor() {}

  getInfluencer(): Observable<Influencer> {
    return of(this.influencer);
  }

  getCampaigns(): Observable<Campaign[]> {
    // return active and related campaigns
    return of(this.campaigns);
  }

  applyToCampaign(campaignId: number, influencerId: number): Observable<{ success: boolean; message: string }> {
    const camp = this.campaigns.find(c => c.id === campaignId);
    if (!camp) return of({ success: false, message: 'Campaign not found' });
    if (!camp.assignedInfluencerIds) camp.assignedInfluencerIds = [];
    if (camp.assignedInfluencerIds.includes(influencerId)) {
      return of({ success: false, message: 'Already assigned' });
    }
    camp.applications = (camp.applications || 0) + 1;
    camp.assignedInfluencerIds.push(influencerId);
    return of({ success: true, message: 'Applied successfully' });
  }

  uploadContentMock(campaignId: number, influencerId: number, fileName: string): Observable<{ success: boolean; message: string }> {
    // just simulate success
    return of({ success: true, message: `Uploaded ${fileName} for campaign ${campaignId}` });
  }

  getPayoutRequests(influencerId: number): Observable<Payout[]> {
    return of(this.payouts.filter(p => p.influencerId === influencerId));
  }

  requestPayout(influencerId: number, amount: number, method: 'BANK' | 'UPI' | 'WALLET'): Observable<Payout> {
    const req: Payout = {
      id: this.payouts.length + 1,
      influencerId,
      amount,
      method,
      status: 'PENDING',
      requestedAt: new Date()
    };
    this.payouts.unshift(req);
    // reduce balance (simulate)
    if (this.influencer.currentBalance >= amount) this.influencer.currentBalance -= amount;
    return of(req);
  }
}
