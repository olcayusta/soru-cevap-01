import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAnswersResolverService } from './resolvers/user-answers-resolver.service';

import { UserAnswersComponent } from './user-answers.component';

const routes: Routes = [
  {
    path: '',
    component: UserAnswersComponent,
    resolve: {
      answers: UserAnswersResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAnswersRoutingModule {
}
