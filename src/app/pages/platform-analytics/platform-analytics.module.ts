import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlatformAnalyticsPageRoutingModule } from './platform-analytics-routing.module';

import { PlatformAnalyticsPage } from './platform-analytics.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlatformAnalyticsPageRoutingModule
  ],
  declarations: [PlatformAnalyticsPage]
})
export class PlatformAnalyticsPageModule {}
