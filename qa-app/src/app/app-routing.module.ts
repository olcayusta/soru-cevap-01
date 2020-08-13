import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from '@shared/guards/login.guard';
import { SidenavContainerComponent } from './sidenav-container/sidenav-container.component';

const routes: Routes = [
  {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule), canLoad: [LoginGuard]},
  {path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule), canLoad: [LoginGuard]},
  {
    path: '',
    component: SidenavContainerComponent,
    children: [
      {path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
      {path: 'ask', loadChildren: () => import('./create-question/create-question.module').then(m => m.CreateQuestionModule)},
      {path: 'library', loadChildren: () => import('./library/library.module').then(m => m.LibraryModule)},
      {path: 'question', loadChildren: () => import('./question/question.module').then(m => m.QuestionModule)},
      {path: 'favorites', loadChildren: () => import('./my-favorites/my-favorites.module').then(m => m.MyFavoritesModule)},
      {path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
      {path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule)},
      {path: 'tags', loadChildren: () => import('./tags/tags.module').then(m => m.TagsModule)},
      {path: 'tag', loadChildren: () => import('./tag/tag.module').then(m => m.TagModule)},
      {path: 'search', loadChildren: () => import('./search/search.module').then(m => m.SearchModule)}
    ]
  },
  {path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)},
  {path: '**', loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    urlUpdateStrategy: 'eager',
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
