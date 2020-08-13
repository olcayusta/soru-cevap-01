import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from '@shared/material/material.module';

import { PasswordFormRoutingModule } from './password-form-routing.module';
import { PasswordFormComponent } from './password-form.component';


@NgModule({
  declarations: [PasswordFormComponent],
  imports: [
    CommonModule,
    PasswordFormRoutingModule,
    MaterialModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class PasswordFormModule {
}
