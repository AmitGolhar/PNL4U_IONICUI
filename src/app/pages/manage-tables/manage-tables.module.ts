import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageTablesPageRoutingModule } from './manage-tables-routing.module';

import { ManageTablesPage } from './manage-tables.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageTablesPageRoutingModule
  ],
  declarations: [ManageTablesPage]
})
export class ManageTablesPageModule {}
