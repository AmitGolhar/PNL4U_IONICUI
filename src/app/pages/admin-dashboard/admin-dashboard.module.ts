import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminDashboardPageRoutingModule } from './admin-dashboard-routing.module';

import { AdminDashboardPage } from './admin-dashboard.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClubRequestsComponent } from './club-requests/club-requests.component';
import { EventRequestsComponent } from './event-requests/event-requests.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminDashboardPageRoutingModule,
    SharedModule
  ],
  declarations: [AdminDashboardPage,ClubRequestsComponent,EventRequestsComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AdminDashboardPageModule {}
