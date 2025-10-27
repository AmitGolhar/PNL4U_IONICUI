import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfluencerDashboardPageRoutingModule } from './influencer-dashboard-routing.module';

import { InfluencerDashboardPage } from './influencer-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfluencerDashboardPageRoutingModule
  ],
  declarations: [InfluencerDashboardPage]
})
export class InfluencerDashboardPageModule {}
