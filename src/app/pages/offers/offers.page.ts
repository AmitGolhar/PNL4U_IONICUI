import { Component, OnInit } from '@angular/core';
import { PromoCode } from 'src/app/models/offer-master.model';
import { OfferMaster } from 'src/app/models/wallet.model';
import { OffersService } from 'src/app/services/offers-wallet';
 
@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss']
})
export class OffersPage implements OnInit {
  offers: OfferMaster[] = [];
  promoCodes: PromoCode[] = [];
  activeTab: string = 'offers';
  promoInput: string = '';
  userRole: 'USER' | 'CLUBADMIN' | 'APPADMIN' = 'USER'; // change for testing

  constructor(private offerService: OffersService) {}

  ngOnInit() {
    this.loadOffers();
    this.loadPromoCodes();
  }

  loadOffers() {
    this.offerService.getOffers().subscribe(data => (this.offers = data));
  }

  loadPromoCodes() {
    this.offerService.getPromoCodes().subscribe(data => (this.promoCodes = data));
  }

  applyPromo() {
    if (!this.promoInput) return;
    this.offerService.applyPromo(this.promoInput).subscribe(res => alert(res.message));
    this.promoInput = '';
  }

  createOffer() {
    const newOffer: OfferMaster = {
      id: 0,
      clubId: 111,
      title: 'New Year Mega Bash 🥂',
      description: 'Get 50% off on entry + welcome drink!',
      discountPercent: 50,
      startDate: new Date(),
      endDate: new Date(Date.now() + 5 * 86400000),
      createdBy: 'ClubAdmin'
    };
    this.offerService.createOffer(newOffer.clubId ,newOffer ).subscribe(() => {
      alert('🎉 Offer Created!');
      this.loadOffers();
    });
  }
}
