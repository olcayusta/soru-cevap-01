import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from '@shared/material/material.module';
import { SharedModule } from '@shared/shared.module';

import { CreateQuestionRoutingModule } from './create-question-routing.module';
import { CreateQuestionComponent } from './create-question.component';
import { ChipsAutocompleteComponent } from './chips-autocomplete/chips-autocomplete.component';


@NgModule({
  declarations: [CreateQuestionComponent, ChipsAutocompleteComponent],
  imports: [
    CommonModule,
    CreateQuestionRoutingModule,
    MaterialModule,
    MatInputModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CreateQuestionModule { }
