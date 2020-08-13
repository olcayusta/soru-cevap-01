import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasswordFormComponent } from './password-form.component';

const routes: Routes = [{ path: '', component: PasswordFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordFormRoutingModule { }
