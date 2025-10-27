import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PromoterDashboardPageRoutingModule } from './promoter-dashboard-routing.module';

import { PromoterDashboardPage } from './promoter-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PromoterDashboardPageRoutingModule
  ],
  declarations: [PromoterDashboardPage]
})
export class PromoterDashboardPageModule {}
