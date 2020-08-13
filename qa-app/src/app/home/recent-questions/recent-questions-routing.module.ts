import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecentQuestionsComponent } from './recent-questions.component';
import { RecentQuestionsResolverService } from './resolvers/recent-questions-resolver.service';

const routes: Routes = [
  {path: '', component: RecentQuestionsComponent, resolve: {questions: RecentQuestionsResolverService}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecentQuestionsRoutingModule {
}
