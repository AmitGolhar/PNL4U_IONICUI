import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayoutReportsPage } from './payout-reports.page';

const routes: Routes = [
  {
    path: '',
    component: PayoutReportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayoutReportsPageRoutingModule {}
