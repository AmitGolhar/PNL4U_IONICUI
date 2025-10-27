import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VenueSettingsPageRoutingModule } from './venue-settings-routing.module';

import { VenueSettingsPage } from './venue-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VenueSettingsPageRoutingModule
  ],
  declarations: [VenueSettingsPage]
})
export class VenueSettingsPageModule {}
