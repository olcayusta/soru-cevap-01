import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserResolverService } from './resolvers/user-resolver.service';

import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: ':userId',
    component: UserComponent,
    resolve: {
      user: UserResolverService
    },
    children: [
      {path: 'answers', loadChildren: () => import('./user-answers/user-answers.module').then(m => m.UserAnswersModule)},
      {path: 'questions', loadChildren: () => import('./user-questions/user-questions.module').then(m => m.UserQuestionsModule)},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
