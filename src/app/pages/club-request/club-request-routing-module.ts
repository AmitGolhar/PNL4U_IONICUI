import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubRequestFormComponent } from './club-request-form/club-request-form.component';

const routes: Routes = [
  {
    path: '',
    component: ClubRequestFormComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClubRequestRoutingModule { }
