import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ClubDetailPageRoutingModule } from './club-detail-routing.module';
import { ClubDetailsPage } from './club-detail.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ClubDetailPageRoutingModule],
  declarations: [ClubDetailsPage],
})
export class ClubDetailPageModule {}
