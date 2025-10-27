import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeaturedEventsPage } from './featured-events.page';

const routes: Routes = [
  {
    path: '',
    component: FeaturedEventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturedEventsPageRoutingModule {}
