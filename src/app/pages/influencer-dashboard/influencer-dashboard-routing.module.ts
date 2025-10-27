import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfluencerDashboardPage } from './influencer-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: InfluencerDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfluencerDashboardPageRoutingModule {}
