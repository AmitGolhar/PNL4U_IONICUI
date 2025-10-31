import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubDetailsPage } from './club-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ClubDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClubDetailPageRoutingModule {}
