import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PromoterDashboardPage } from './promoter-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: PromoterDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PromoterDashboardPageRoutingModule {}
