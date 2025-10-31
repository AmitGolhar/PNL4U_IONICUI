import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OfferMaster } from '../models/wallet.model';
import { PromoCode } from '../models/offer-master.model';
 
@Injectable({ providedIn: 'root' })
export class OffersService {
  private dummyOffers: OfferMaster[] = [
    {
      id: 1,
      clubId: 11,
      title: 'Ladies Night Offer 💃',
      description: 'Free cocktails for ladies till 11 PM',
      discountPercent: 0,
      cashbackAmount: 0,
      startDate: new Date(),
      endDate: new Date(Date.now() + 86400000 * 3),
      createdBy: 'ClubAdmin'
    },
    {
      id: 2,
      clubId: 22,
      title: 'Weekend Cashback Blast 💸',
      description: 'Get 20% cashback on every 2nd drink!',
      discountPercent: 0,
      cashbackAmount: 100,
      startDate: new Date(),
      endDate: new Date(Date.now() + 86400000 * 7),
      createdBy: 'ClubAdmin'
    },
    {
      id: 3,
      clubId: 33,
      title: 'Loyalty Bonus Rewards 🌟',
      description: 'Earn double loyalty points this week!',
      discountPercent: 10,
      cashbackAmount: 50,
      startDate: new Date(),
      endDate: new Date(Date.now() + 86400000 * 5),
      createdBy: 'AppAdmin'
    }
  ];
 private dummyPromoCodes: PromoCode[] = [
    {
      id: 1,
      code: 'WELCOME100',
      description: 'Flat ₹100 off on your first booking',
      discountPercent: 10,
      expiryDate: new Date(Date.now() + 10 * 86400000),
      usageCount: 0,
      maxUsage: 5
    },
    {
      id: 2,
      code: 'VIP20',
      description: 'Exclusive 20% discount for VIP users',
      discountPercent: 20,
      expiryDate: new Date(Date.now() + 15 * 86400000),
      usageCount: 1,
      maxUsage: 3
    }
  ];
  constructor() {}

  getOffers(): Observable<OfferMaster[]> {
    return of(this.dummyOffers);
  }
 getPromoCodes(): Observable<PromoCode[]> {
    return of(this.dummyPromoCodes);
  }

  getOffersByClub(clubId: number): Observable<OfferMaster[]> {
    const filtered = this.dummyOffers.filter(o => o.clubId === clubId);
    return of(filtered);
  }

  createOffer(clubId: number, offer: OfferMaster): Observable<OfferMaster> {
    const newOffer = { ...offer, id: this.dummyOffers.length + 1, clubId };
    this.dummyOffers.unshift(newOffer);
    return of(newOffer);
  }

   applyPromo(code: string): Observable<{ success: boolean; message: string }> {
    const promo = this.dummyPromoCodes.find(p => p.code === code.toUpperCase());
    if (!promo) return of({ success: false, message: 'Invalid promo code.' });
    if (promo.usageCount >= promo.maxUsage)
      return of({ success: false, message: 'Promo code usage limit reached.' });
    promo.usageCount++;
    return of({ success: true, message: `Promo ${promo.code} applied successfully! 🎉` });
  }
  
}
