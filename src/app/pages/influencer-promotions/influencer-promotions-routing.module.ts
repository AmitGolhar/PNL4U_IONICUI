import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfluencerPromotionsPage } from './influencer-promotions.page';

const routes: Routes = [
  {
    path: '',
    component: InfluencerPromotionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfluencerPromotionsPageRoutingModule {}
