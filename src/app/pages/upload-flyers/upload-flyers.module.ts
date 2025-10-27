import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadFlyersPageRoutingModule } from './upload-flyers-routing.module';

import { UploadFlyersPage } from './upload-flyers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadFlyersPageRoutingModule
  ],
  declarations: [UploadFlyersPage]
})
export class UploadFlyersPageModule {}
