import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClubsPage } from './clubs.page';
 
const routes: Routes = [
  {
    path: '',
    component: ClubsPage,
  },
  {
    path: 'club/:clubId',
    loadChildren: () =>
      import('../clubs/club-detail/club-detail.module').then(
        (m) => m.ClubDetailPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClubsPageRoutingModule {}
