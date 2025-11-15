import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminDashboardPageRoutingModule } from './admin-dashboard-routing.module';

import { AdminDashboardPage } from './admin-dashboard.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClubRequestsComponent } from './club-requests/club-requests.component';
import { EventRequestsComponent } from './event-requests/event-requests.component';
import { ApprovalConfigModalComponent } from './approval-config-modal/ApprovalConfigModalComponent';
import { EventEditModalComponent } from './event-edit-modal/event-edit-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminDashboardPageRoutingModule,
    SharedModule
  ],
  declarations: [AdminDashboardPage,ClubRequestsComponent,EventRequestsComponent,ApprovalConfigModalComponent,EventEditModalComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AdminDashboardPageModule {}
