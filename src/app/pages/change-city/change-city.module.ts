import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeCityPageRoutingModule } from './change-city-routing.module';

import { ChangeCityPage } from './change-city.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeCityPageRoutingModule
  ],
  declarations: [ChangeCityPage]
})
export class ChangeCityPageModule {}
