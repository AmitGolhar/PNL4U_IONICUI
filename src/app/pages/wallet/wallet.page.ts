import { Component, OnInit } from '@angular/core';
import { OfferMaster, TransactionMaster, WalletMaster } from 'src/app/models/wallet.model';
import { OffersService } from 'src/app/services/offers-wallet';
import { WalletService } from 'src/app/services/wallet';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements   OnInit {
  wallet?: WalletMaster;
  offers: OfferMaster[] = [];
  transactions: TransactionMaster[] = [];
  activeTab: string = 'wallet';
  userRole: 'USER' | 'CLUBADMIN' | 'APPADMIN' = 'USER'; // change this for testing

  constructor(
    private walletService: WalletService,
    private offersService: OffersService
  ) {}

  ngOnInit() {
    this.loadWallet();
    this.loadOffers();
  }

  loadWallet() {
    this.walletService.getWallet(101).subscribe(res => (this.wallet = res));
    this.walletService.getTransactions(1).subscribe(txns => (this.transactions = txns));
  }

  loadOffers() {
    this.offersService.getOffers().subscribe(res => (this.offers = res));
  }

  redeemOffer(offer: OfferMaster) {
    if (!this.wallet) return;
    const cashback = offer.cashbackAmount || 0;
    if (cashback > 0) {
      this.walletService.redeemCashback(this.wallet.id, cashback).subscribe(updated => {
        this.wallet = updated;
        alert(`💸 Cashback of ₹${cashback} redeemed successfully!`);
      });
    } else {
      alert('This offer has no cashback to redeem.');
    }
  }

  createOffer() {
    const newOffer: OfferMaster = {
      id: 0,
      clubId: 1,
      title: 'PNL4U VIP Night Special 🌃',
      description: 'Flat 25% off entry + 2 complimentary drinks',
      discountPercent: 25,
      startDate: new Date(),
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      createdBy: 'ClubAdmin'
    };
    this.offersService.createOffer(1, newOffer).subscribe(() => {
      alert('🎉 New Offer Created!');
      this.loadOffers();
    });
  }
}