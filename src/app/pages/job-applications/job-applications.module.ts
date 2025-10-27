import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobApplicationsPageRoutingModule } from './job-applications-routing.module';

import { JobApplicationsPage } from './job-applications.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobApplicationsPageRoutingModule
  ],
  declarations: [JobApplicationsPage]
})
export class JobApplicationsPageModule {}
