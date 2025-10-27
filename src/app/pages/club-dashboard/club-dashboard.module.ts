import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClubDashboardPageRoutingModule } from './club-dashboard-routing.module';

import { ClubDashboardPage } from './club-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClubDashboardPageRoutingModule
  ],
  declarations: [ClubDashboardPage]
})
export class ClubDashboardPageModule {}
