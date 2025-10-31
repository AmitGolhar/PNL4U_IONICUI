import { Component, OnInit } from '@angular/core';

type OfferStatus = 'OPEN' | 'CLOSED' | 'EXPIRED';

interface Promotion {
  id: number;
  title: string;
  description: string;
  image?: string;
  club: string;
  validTill: string; // ISO date string
  createdAt: string;
}

interface Offer {
  id: number;
  title: string;
  description: string;
  club: string;
  payoutAmount: number;
  status: OfferStatus;
  startDate: string;
  endDate: string;
  banner?: string;
  requiredFollowers?: number;
}

interface Application {
  id: number;
  offerId: number;
  influencerId: number;
  appliedAt: string;
  status: 'PENDING' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';
  submissionUrl?: string;
  notes?: string;
}

@Component({
  selector: 'app-influencer-promotions',
  templateUrl: './influencer-promotions.page.html',
  styleUrls: ['./influencer-promotions.page.scss'],
})
export class InfluencerPromotionsPage implements OnInit {

  // UI
  activeTab: 'promotions' | 'offers' | 'applications' = 'offers';

  // Modal state
  showOfferModal = false;
  modalOffer: Offer | null = null;
  uploadPreview: string | null = null;

  // Dummy influencer context
  influencer = {
    id: 101,
    name: 'Maya ',
    handle: '@Maya4U',
    followers: 52200,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=60'
  };

  // Dummy data
  promotions: Promotion[] = [];
  offers: Offer[] = [];
  applications: Application[] = [];

  constructor() {}

  ngOnInit(): void {
    // promotions (banners)
    this.promotions = [
      {
        id: 1,
        title: 'Weekend Neon Party — 25% off promotion',
        description: 'Exclusive collab with neon venues. Promote & earn better payouts.',
        image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=60',
        club: 'Neon Vibe',
        validTill: '2025-12-31',
        createdAt: '2025-10-01'
      },
      {
        id: 2,
        title: 'Urban Nights — VIP Tables',
        description: 'Highlight VIP table experiences and drive bookings.',
        image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=60',
        club: 'Club Infinity',
        validTill: '2025-11-30',
        createdAt: '2025-09-22'
      }
    ];

    // offers open for influencers
    this.offers = [
      {
        id: 101,
        title: 'Promote Friday Neon Night',
        description: 'Create 1 reel + 3 stories tagging the club; show table experience.',
        club: 'Neon Vibe',
        payoutAmount: 6000,
        status: 'OPEN',
        startDate: '2025-10-20',
        endDate: '2025-11-20',
        banner: 'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=1200&q=60',
        requiredFollowers: 10000
      },
      {
        id: 102,
        title: 'Feature VIP Cocktail Menu',
        description: '1 static post + 2 reels; showcase cocktails and bartender.',
        club: 'SkyLounge',
        payoutAmount: 12000,
        status: 'OPEN',
        startDate: '2025-10-25',
        endDate: '2025-11-30',
        banner: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=60',
        requiredFollowers: 20000
      },
      {
        id: 103,
        title: 'Low-key Weekday Promo',
        description: 'Promote weekday happy hour. Stories only.',
        club: 'Electric Dreams',
        payoutAmount: 2500,
        status: 'CLOSED',
        startDate: '2025-08-01',
        endDate: '2025-09-01'
      }
    ];

    // sample applications
    this.applications = [
      {
        id: 1,
        offerId: 101,
        influencerId: 101,
        appliedAt: '2025-10-21T10:20:00Z',
        status: 'PENDING'
      }
    ];
  }

  // ----- helpers -----
  isApplied(offer: Offer): boolean {
    return this.applications.some(a => a.offerId === offer.id && a.influencerId === this.influencer.id);
  }

  getApplicationForOffer(offer: Offer): Application | undefined {
    return this.applications.find(a => a.offerId === offer.id && a.influencerId === this.influencer.id);
  }

  // ----- actions -----
  openOfferDetail(offer: Offer) {
    this.modalOffer = { ...offer };
    this.uploadPreview = null;
    this.showOfferModal = true;
  }

  closeOfferModal() {
    this.showOfferModal = false;
    this.modalOffer = null;
    this.uploadPreview = null;
  }

  applyToOffer(offer: Offer) {
    // if already applied, prevent duplicate
    if (this.isApplied(offer)) return;
    const app: Application = {
      id: this.applications.length + 1,
      offerId: offer.id,
      influencerId: this.influencer.id,
      appliedAt: new Date().toISOString(),
      status: 'PENDING'
    };
    this.applications.unshift(app);
  }

  withdrawApplication(app: Application) {
    this.applications = this.applications.filter(a => a.id !== app.id);
  }

  // Simulated submission: attach upload preview (url) and mark SUBMITTED
  submitContent(app: Application) {
    if (!app) return;
    app.status = 'SUBMITTED';
    // attach a dummy submissionUrl if present
    if (this.uploadPreview) app.submissionUrl = this.uploadPreview;
    this.closeOfferModal();
  }

  // file handler for modal upload
  onFileSelected(ev: any) {
    const file = ev.target?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.uploadPreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  // convenience to list offer by id
  offersOpen(): Offer[] {
    return this.offers.filter(o => o.status === 'OPEN');
  }

  // small utility formatting
  formatCurrency(v: number) {
    return '₹' + v.toLocaleString('en-IN');
  }
  // returns Offer | undefined
getOfferById(offerId: number) {
  return this.offers.find(o => o.id === offerId);
}

// safe wrapper to open offer detail by id
openOfferDetailById(offerId: number) {
  const o = this.getOfferById(offerId);
  if (!o) return;
  this.openOfferDetail(o);
}

// call this from the template to submit for the currently opened modalOffer
submitForModalOffer() {
  if (!this.modalOffer) return;

  // find existing application for this influencer & offer
  let app = this.getApplicationForOffer(this.modalOffer);
  if (!app) {
    // create a new application and insert it so it appears in the UI
    app = {
      id: this.applications.length + 1,
      offerId: this.modalOffer.id,
      influencerId: this.influencer.id,
      appliedAt: new Date().toISOString(),
      status: 'PENDING'
    } as Application;

    this.applications.unshift(app);
  }

  // call existing submit handler (it uses this.uploadPreview if set)
  this.submitContent(app);
}


}