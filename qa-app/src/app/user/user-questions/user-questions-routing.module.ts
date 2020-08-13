import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserQuestionsResolverService } from './resolvers/user-questions-resolver.service';

import { UserQuestionsComponent } from './user-questions.component';

const routes: Routes = [
  {
    path: '',
    component: UserQuestionsComponent,
    resolve: {
      questions: UserQuestionsResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserQuestionsRoutingModule {
}
