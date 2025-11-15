import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EventCardComponent } from './event-card/event-card.component';
import { EventFiltersComponent } from './event-filters/event-filters.component';
import { EventSectionComponent } from './event-section/event-section.component';
 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule,
  
  ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA] ,

  declarations: [HomePage,EventCardComponent, EventSectionComponent, EventFiltersComponent]
})
export class HomePageModule {}
