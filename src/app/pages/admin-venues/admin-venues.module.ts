import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminVenuesPageRoutingModule } from './admin-venues-routing.module';

import { AdminVenuesPage } from './admin-venues.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminVenuesPageRoutingModule
  ],
  declarations: [AdminVenuesPage]
})
export class AdminVenuesPageModule {}
