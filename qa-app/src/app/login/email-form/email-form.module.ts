import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IconModule } from '@shared/icon/icon.module';
import { MaterialModule } from '@shared/material/material.module';

import { EmailFormRoutingModule } from './email-form-routing.module';
import { EmailFormComponent } from './email-form.component';

@NgModule({
  declarations: [EmailFormComponent],
  imports: [
    CommonModule,
    EmailFormRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    IconModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class EmailFormModule {
}
