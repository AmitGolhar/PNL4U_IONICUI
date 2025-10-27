import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayoutReportsPageRoutingModule } from './payout-reports-routing.module';

import { PayoutReportsPage } from './payout-reports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayoutReportsPageRoutingModule
  ],
  declarations: [PayoutReportsPage]
})
export class PayoutReportsPageModule {}
