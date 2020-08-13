import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from '@shared/material/material.module';

import { QuestionRoutingModule } from './question-routing.module';
import { QuestionComponent } from './question.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentListItemComponent } from './comment-list/comment-list-item/comment-list-item.component';
import { AnswerListComponent } from './answer-list/answer-list.component';
import { AnswerListItemComponent } from './answer-list/answer-list-item/answer-list-item.component';
import { ReplyFormComponent } from './reply-form/reply-form.component';
import { PrettyPrintDirective } from './directives/pretty-print.directive';
import { FileCopyButtonComponent } from './file-copy-button/file-copy-button.component';

@NgModule({
  declarations: [
    QuestionComponent,
    CommentListComponent,
    CommentListItemComponent,
    AnswerListComponent,
    AnswerListItemComponent,
    ReplyFormComponent,
    PrettyPrintDirective,
    FileCopyButtonComponent
  ],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    MaterialModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class QuestionModule {
}
