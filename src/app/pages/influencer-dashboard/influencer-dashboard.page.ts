import { Component, OnInit } from '@angular/core';
import { Influencer, Campaign, Payout } from 'src/app/models/influencer.model';
import { InfluencerService } from 'src/app/services/influencers';
 

@Component({
  selector: 'app-influencer-dashboard',
  templateUrl: './influencer-dashboard.page.html',
  styleUrls: ['./influencer-dashboard.page.scss']
})
export class InfluencerDashboardPage implements OnInit {
  influencer?: Influencer;
  campaigns: Campaign[] = [];
  filteredCampaigns: Campaign[] = [];
  payoutRequests: Payout[] = [];

  /** Use plain string for Angular template binding safety */
  activeTab: string = 'overview';

  applyInProgress = false;
  uploadMessage = '';

  // computed counts
  activeCampaignCount = 0;
  openInvitationCount = 0;
  pendingPayoutCount = 0;

  constructor(private svc: InfluencerService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.svc.getInfluencer().subscribe(i => {
      this.influencer = i;
      this.refreshComputedCounts();
    });

    this.svc.getCampaigns().subscribe(c => {
      this.campaigns = c;
      this.filteredCampaigns = c;
      this.refreshComputedCounts();
    });

    this.svc.getPayoutRequests(501).subscribe(p => {
      this.payoutRequests = p;
      this.refreshComputedCounts();
    });
  }

  refreshComputedCounts() {
    if (!this.campaigns || !this.influencer) return;
    this.activeCampaignCount = this.campaigns.filter(c => c.status === 'ACTIVE').length;
    this.openInvitationCount = this.campaigns.filter(
      c => !(c.assignedInfluencerIds || []).includes(this.influencer!.id) && c.status === 'ACTIVE'
    ).length;
    this.pendingPayoutCount = this.payoutRequests.filter(p => p.status === 'PENDING').length;
  }

  apply(campaignId: number) {
    if (!this.influencer) return;
    this.applyInProgress = true;
    this.svc.applyToCampaign(campaignId, this.influencer.id).subscribe(res => {
      alert(res.message);
      this.applyInProgress = false;
      this.svc.getCampaigns().subscribe(c => {
        this.campaigns = c;
        this.filteredCampaigns = c;
        this.refreshComputedCounts();
      });
    });
  }

uploadContent(c: Campaign, event: Event): void {
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) return;

  const file = input.files[0];
  this.svc.uploadContentMock(c.id, this.influencer!.id, file.name).subscribe(res => {
    this.uploadMessage = res.message;
    setTimeout(() => (this.uploadMessage = ''), 3000);
  });
}



  requestPayout(amountStr: string) {
    if (!this.influencer) return;
    const amount = Number(amountStr);
    if (!amount || amount <= 0) return alert('Enter amount > 0');
    if (amount > this.influencer.currentBalance) return alert('Not enough balance');
    this.svc.requestPayout(this.influencer.id, amount, 'UPI').subscribe(req => {
      alert('Payout requested');
      this.svc.getPayoutRequests(this.influencer!.id).subscribe(p => {
        this.payoutRequests = p;
        this.refreshComputedCounts();
      });
    });
  }

  filterActive() {
    this.filteredCampaigns = this.campaigns.filter(c => c.status === 'ACTIVE');
  }

  showAll() {
    this.filteredCampaigns = [...this.campaigns];
  }
}
