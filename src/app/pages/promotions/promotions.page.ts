import { Component, OnInit } from '@angular/core';
type OfferStatus = 'DRAFT' | 'ACTIVE' | 'EXPIRED' | 'PAUSED';
type PromoStatus = 'ACTIVE' | 'EXPIRED' | 'REDEEMED';

interface Offer {
  id: number;
  title: string;
  description: string;
  club: string;
  startDate: string; // iso string
  endDate: string;   // iso string
  discountPercent: number;
  banner?: string;   // dataURL or url
  status: OfferStatus;
  usageLimit?: number;
}

interface PromoCode {
  id: number;
  code: string;
  description?: string;
  discountAmount?: number; // flat amount
  discountPercent?: number; // percent
  validTill: string;
  status: PromoStatus;
  uses: number;
}

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.page.html',
  styleUrls: ['./promotions.page.scss'],
})
export class PromotionsPage implements OnInit {

  // UI state
  activeTab: 'offers' | 'promocodes' = 'offers';
  filterStatus: OfferStatus | 'ALL' = 'ALL';

  // Modals
  showOfferModal = false;
  editingOffer: Partial<Offer> | null = null;
  bannerPreview: string | null = null;

  showPromoModal = false;
  editingPromo: Partial<PromoCode> | null = null;

  // Dummy data
  offers: Offer[] = [];
  promoCodes: PromoCode[] = [];

  ngOnInit(): void {
    this.offers = [
      {
        id: 1,
        title: 'Weekend Neon Party - 30% OFF',
        description: 'Get 30% off table bookings for Friday & Saturday.',
        club: 'Neon Vibe Bar',
        startDate: '2025-10-24',
        endDate: '2025-11-30',
        discountPercent: 30,
        banner: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=60',
        status: 'ACTIVE',
        usageLimit: 150
      },
      {
        id: 2,
        title: 'Ladies Night - Free Entry',
        description: 'Ladies get free entry before 11pm on Thursdays.',
        club: 'Club Infinity',
        startDate: '2025-09-01',
        endDate: '2025-12-31',
        discountPercent: 100,
        banner: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=60',
        status: 'ACTIVE'
      },
      {
        id: 3,
        title: 'Off-Peak Happy Hour - 20% OFF',
        description: 'Weekday early birds get discounts on drinks.',
        club: 'Electric Dreams',
        startDate: '2025-10-01',
        endDate: '2025-12-31',
        discountPercent: 20,
        status: 'PAUSED'
      }
    ];

    this.promoCodes = [
      { id: 1, code: 'PNL4U50', description: '₹50 off on orders > ₹500', discountAmount: 50, validTill: '2025-12-31', status: 'ACTIVE', uses: 34 },
      { id: 2, code: 'NEON30', description: '30% off on select nights', discountPercent: 30, validTill: '2025-11-15', status: 'ACTIVE', uses: 120 },
      { id: 3, code: 'WELCOME100', description: '₹100 off for new users', discountAmount: 100, validTill: '2025-10-31', status: 'EXPIRED', uses: 450 }
    ];
  }

  // ---------- Offers ----------
  openCreateOffer() {
    this.editingOffer = {
      title: '',
      description: '',
      club: '',
      startDate: '',
      endDate: '',
      discountPercent: 10,
      status: 'DRAFT'
    };
    this.bannerPreview = null;
    this.showOfferModal = true;
  }

  openEditOffer(o: Offer) {
    // shallow copy to avoid binding directly
    this.editingOffer = { ...o };
    this.bannerPreview = o.banner ?? null;
    this.showOfferModal = true;
  }

  saveOffer() {
    if (!this.editingOffer) return;
    const e = this.editingOffer;
    if (!e.title || !e.startDate || !e.endDate) {
      alert('Please fill title, start date and end date.');
      return;
    }

    if (e.id) {
      // update
      const idx = this.offers.findIndex(x => x.id === e.id);
      if (idx > -1) {
        this.offers[idx] = {
          ...(this.offers[idx]),
          title: e.title!,
          description: e.description || '',
          club: e.club || '',
          startDate: e.startDate!,
          endDate: e.endDate!,
          discountPercent: e.discountPercent || 0,
          banner: this.bannerPreview || this.offers[idx].banner,
          status: (e.status as OfferStatus) || this.offers[idx].status,
          usageLimit: e.usageLimit
        };
      }
    } else {
      // create
      const newOffer: Offer = {
        id: this.offers.length + 1,
        title: e.title!,
        description: e.description || '',
        club: e.club || 'Unknown Club',
        startDate: e.startDate!,
        endDate: e.endDate!,
        discountPercent: e.discountPercent || 0,
        banner: this.bannerPreview || undefined,
        status: (e.status as OfferStatus) || 'DRAFT',
        usageLimit: e.usageLimit
      };
      this.offers.unshift(newOffer);
    }

    this.showOfferModal = false;
    this.editingOffer = null;
    this.bannerPreview = null;
    alert('Offer saved.');
  }

  deleteOffer(id: number) {
    if (!confirm('Delete this offer?')) return;
    this.offers = this.offers.filter(o => o.id !== id);
  }

  toggleOfferStatus(o: Offer) {
    if (o.status === 'ACTIVE') o.status = 'PAUSED';
    else if (o.status === 'PAUSED') o.status = 'ACTIVE';
    else if (o.status === 'DRAFT') o.status = 'ACTIVE';
  }

  onBannerSelected(ev: any) {
    // use $any in template to avoid strict template typing issues
    const file = ev.target?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.bannerPreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  // filter helpers
  filteredOffers(): Offer[] {
    if (this.filterStatus === 'ALL') return this.offers;
    return this.offers.filter(o => o.status === this.filterStatus);
  }

  // ---------- Promo Codes ----------
  openCreatePromo() {
    this.editingPromo = { code: '', validTill: '', status: 'ACTIVE', uses: 0 };
    this.showPromoModal = true;
  }

  openEditPromo(p: PromoCode) {
    this.editingPromo = { ...p };
    this.showPromoModal = true;
  }

  savePromo() {
    if (!this.editingPromo) return;
    const p = this.editingPromo;
    if (!p.code || !p.validTill) {
      alert('Please provide code and validity date.');
      return;
    }

    if (p.id) {
      const idx = this.promoCodes.findIndex(x => x.id === p.id);
      if (idx > -1) this.promoCodes[idx] = { ...(this.promoCodes[idx]), ...p } as PromoCode;
    } else {
      const newP: PromoCode = {
        id: this.promoCodes.length + 1,
        code: p.code!,
        description: p.description,
        discountAmount: p.discountAmount,
        discountPercent: p.discountPercent,
        validTill: p.validTill!,
        status: (p.status as PromoStatus) || 'ACTIVE',
        uses: p.uses || 0
      };
      this.promoCodes.unshift(newP);
    }

    this.showPromoModal = false;
    this.editingPromo = null;
    alert('Promo saved.');
  }

  deletePromo(id: number) {
    if (!confirm('Delete this promo code?')) return;
    this.promoCodes = this.promoCodes.filter(p => p.id !== id);
  }

  applyPromo(code: string) {
    // dummy apply logic
    const found = this.promoCodes.find(p => p.code === code && p.status === 'ACTIVE');
    if (!found) {
      alert('Invalid or expired promo code.');
      return;
    }
    found.uses += 1;
    alert(`Promo ${found.code} applied!`);
  }

  // small helpers for template
  isActiveOffer(o: Offer) {
    const today = new Date().toISOString().slice(0, 10);
    return o.status === 'ACTIVE' && o.startDate <= today && o.endDate >= today;
  }
}