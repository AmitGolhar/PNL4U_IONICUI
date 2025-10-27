import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClubDashboardPage } from './club-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: ClubDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClubDashboardPageRoutingModule {}
