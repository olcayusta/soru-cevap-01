import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmailFormComponent } from './email-form.component';

const routes: Routes = [
  {path: '', component: EmailFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailFormRoutingModule {
}
