import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAnswersRoutingModule } from './user-answers-routing.module';
import { UserAnswersComponent } from './user-answers.component';


@NgModule({
  declarations: [UserAnswersComponent],
  imports: [
    CommonModule,
    UserAnswersRoutingModule
  ]
})
export class UserAnswersModule { }
