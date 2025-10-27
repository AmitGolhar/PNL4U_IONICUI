import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobApplicationsPage } from './job-applications.page';

const routes: Routes = [
  {
    path: '',
    component: JobApplicationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobApplicationsPageRoutingModule {}
