import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { UserQuestionsRoutingModule } from './user-questions-routing.module';
import { UserQuestionsComponent } from './user-questions.component';


@NgModule({
  declarations: [UserQuestionsComponent],
  imports: [
    CommonModule,
    UserQuestionsRoutingModule,
    SharedModule
  ]
})
export class UserQuestionsModule { }
