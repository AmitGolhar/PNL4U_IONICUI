import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VenueSettingsPage } from './venue-settings.page';

const routes: Routes = [
  {
    path: '',
    component: VenueSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VenueSettingsPageRoutingModule {}
