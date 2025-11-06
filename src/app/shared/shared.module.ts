import { NgModule } from '@angular/core';
 
 import { RouterModule } from '@angular/router';
import { AppHeaderComponent } from './app-header/app-header.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BookingModalComponent } from '../components/booking-modal/booking-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppHeaderComponent,BookingModalComponent],
  imports: [
   CommonModule, 
   IonicModule,
    RouterModule ,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [AppHeaderComponent,BookingModalComponent]  // Make it available to other modules
})
export class SharedModule { }
