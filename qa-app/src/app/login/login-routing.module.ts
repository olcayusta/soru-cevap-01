import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasswordFormGuard } from './guards/password-form.guard';

import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      {path: '', loadChildren: () => import('./email-form/email-form.module').then(m => m.EmailFormModule)},
      {path: 'password', loadChildren: () => import('./password-form/password-form.module').then(m => m.PasswordFormModule), canLoad: [PasswordFormGuard]}
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}
