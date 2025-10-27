import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfluencerPromotionsPageRoutingModule } from './influencer-promotions-routing.module';

import { InfluencerPromotionsPage } from './influencer-promotions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfluencerPromotionsPageRoutingModule
  ],
  declarations: [InfluencerPromotionsPage]
})
export class InfluencerPromotionsPageModule {}
