import { Component, OnInit } from '@angular/core';
import { Referral } from 'src/app/models/referral.model';
import { ReferEarnService } from 'src/app/services/refer-earn.service';

@Component({
  selector: 'app-refer',
  templateUrl: './refer.page.html',
  styleUrls: ['./refer.page.scss'],
})
export class ReferPage implements OnInit {
  referralCode = '';
  referrals: Referral[] = [];
  stats: any = {};
  userRole: 'USER' | 'APPADMIN' = 'USER'; // change for testing

  constructor(private referService: ReferEarnService) {}

  ngOnInit() {
    this.loadReferralData();
  }

  loadReferralData() {
    this.referService.getReferralCode(101).subscribe(code => (this.referralCode = code));
    this.referService.getReferrals(101).subscribe(list => (this.referrals = list));
    this.referService.getReferralStats(101).subscribe(s => (this.stats = s));
  }

  copyCode() {
    navigator.clipboard.writeText(this.referralCode);
    alert('Referral code copied! 📋');
  }

  shareReferral() {
    const msg = `🚀 Join PNL4U — India’s next-gen nightlife app! Use my code *${this.referralCode}* to get ₹200 bonus. 💸 Download now: https://pnl4u.app`;
    if (navigator.share) {
      navigator.share({ title: 'Refer & Earn', text: msg });
    } else {
      alert('Sharing not supported on this device.');
    }
  }
}