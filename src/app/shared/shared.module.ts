import { NgModule } from '@angular/core';
 
 import { RouterModule } from '@angular/router';
import { AppHeaderComponent } from './app-header/app-header.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [AppHeaderComponent],
  imports: [
   CommonModule, 
   IonicModule,
    RouterModule 
    
  ],
  exports: [AppHeaderComponent]  // Make it available to other modules
})
export class SharedModule { }
