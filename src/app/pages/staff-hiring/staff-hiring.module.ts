import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaffHiringPageRoutingModule } from './staff-hiring-routing.module';

import { StaffHiringPage } from './staff-hiring.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StaffHiringPageRoutingModule
  ],
  declarations: [StaffHiringPage]
})
export class StaffHiringPageModule {}
