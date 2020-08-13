import { NgModule } from '@angular/core';
import { GoogleIconComponent } from './google-icon/google-icon.component';
import { GithubIconComponent } from './github-icon/github-icon.component';

@NgModule({
  declarations: [GoogleIconComponent, GithubIconComponent],
  exports: [
    GoogleIconComponent, GithubIconComponent
  ]
})
export class IconModule {
}
