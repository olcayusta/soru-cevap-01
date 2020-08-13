import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyFavoritesComponent } from './my-favorites.component';
import { MyFavoriteQuestionsResolverService } from './resolvers/my-favorite-questions-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: MyFavoritesComponent,
    resolve: {
      questions: MyFavoriteQuestionsResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyFavoritesRoutingModule {
}
