import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadFlyersPage } from './upload-flyers.page';

const routes: Routes = [
  {
    path: '',
    component: UploadFlyersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadFlyersPageRoutingModule {}
