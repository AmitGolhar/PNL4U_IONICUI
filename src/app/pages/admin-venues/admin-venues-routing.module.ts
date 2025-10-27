import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminVenuesPage } from './admin-venues.page';

const routes: Routes = [
  {
    path: '',
    component: AdminVenuesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminVenuesPageRoutingModule {}
