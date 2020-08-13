import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { RecentQuestionsRoutingModule } from './recent-questions-routing.module';
import { RecentQuestionsComponent } from './recent-questions.component';


@NgModule({
  declarations: [RecentQuestionsComponent],
  imports: [
    CommonModule,
    RecentQuestionsRoutingModule,
    SharedModule
  ]
})
export class RecentQuestionsModule { }
