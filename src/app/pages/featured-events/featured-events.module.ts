import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeaturedEventsPageRoutingModule } from './featured-events-routing.module';

import { FeaturedEventsPage } from './featured-events.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeaturedEventsPageRoutingModule
  ],
  declarations: [FeaturedEventsPage]
})
export class FeaturedEventsPageModule {}
