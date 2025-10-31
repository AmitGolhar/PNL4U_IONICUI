import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Referral } from '../models/referral.model';
 
@Injectable({ providedIn: 'root' })
export class ReferEarnService {
  private dummyReferrals: Referral[] = [
    {
      id: 1,
      referrerId: 101,
      referredName: 'Alicia Keys',
      joinedDate: new Date(Date.now() - 2 * 86400000),
      bonusAmount: 200,
      status: 'REWARDED'
    },
    {
      id: 2,
      referrerId: 101,
      referredName: 'Rohit Sharma',
      joinedDate: new Date(Date.now() - 86400000),
      bonusAmount: 0,
      status: 'JOINED'
    },
    {
      id: 3,
      referrerId: 101,
      referredName: 'Tina Kapoor',
      joinedDate: new Date(),
      bonusAmount: 0,
      status: 'PENDING'
    }
  ];

  private referralCode = 'PNL4U1234';

  constructor() {}

  getReferralCode(userId: number): Observable<string> {
    return of(this.referralCode);
  }

  getReferrals(userId: number): Observable<Referral[]> {
    return of(this.dummyReferrals);
  }

  getReferralStats(userId: number): Observable<{ total: number; rewarded: number; pending: number; totalEarnings: number }> {
    const rewarded = this.dummyReferrals.filter(r => r.status === 'REWARDED');
    const totalEarnings = rewarded.reduce((sum, r) => sum + r.bonusAmount, 0);
    return of({
      total: this.dummyReferrals.length,
      rewarded: rewarded.length,
      pending: this.dummyReferrals.filter(r => r.status === 'PENDING').length,
      totalEarnings
    });
  }
}
