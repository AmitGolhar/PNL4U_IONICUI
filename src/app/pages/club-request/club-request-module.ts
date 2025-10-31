import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ClubRequestFormComponent } from './club-request-form/club-request-form.component';
import { RouterModule, Routes } from '@angular/router';
import { PackagesModalComponent } from './packages-modal/packages-modal.component';

const routes: Routes = [
  {
    path: '',
    component: ClubRequestFormComponent
  }
];

@NgModule({
  declarations: [ClubRequestFormComponent,PackagesModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ClubRequestModule {}
