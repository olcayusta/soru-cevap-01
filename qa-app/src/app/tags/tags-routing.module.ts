import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TagsResolverService } from './resolvers/tags-resolver.service';

import { TagsComponent } from './tags.component';

const routes: Routes = [
  {
    path: '',
    component: TagsComponent,
    resolve: {
      tags: TagsResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagsRoutingModule {
}
