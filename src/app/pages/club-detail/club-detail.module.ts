import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClubDetailPageRoutingModule } from './club-detail-routing.module';

import { ClubDetailPage } from './club-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClubDetailPageRoutingModule
  ],
  declarations: [ClubDetailPage]
})
export class ClubDetailPageModule {}
