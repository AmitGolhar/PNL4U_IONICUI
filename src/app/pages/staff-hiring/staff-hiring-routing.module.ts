import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffHiringPage } from './staff-hiring.page';

const routes: Routes = [
  {
    path: '',
    component: StaffHiringPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffHiringPageRoutingModule {}
