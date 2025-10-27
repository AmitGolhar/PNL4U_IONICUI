import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeCityPage } from './change-city.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeCityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeCityPageRoutingModule {}
