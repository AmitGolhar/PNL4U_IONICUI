import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlatformAnalyticsPage } from './platform-analytics.page';

const routes: Routes = [
  {
    path: '',
    component: PlatformAnalyticsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlatformAnalyticsPageRoutingModule {}
