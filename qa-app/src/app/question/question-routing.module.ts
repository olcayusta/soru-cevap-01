import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionComponent } from './question.component';
import { QuestionResolverService } from './resolvers/question-resolver.service';

const routes: Routes = [
  {
    path: ':questionId',
    component: QuestionComponent,
    resolve: {
      question: QuestionResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule {
}
