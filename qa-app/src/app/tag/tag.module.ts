import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { TagRoutingModule } from './tag-routing.module';
import { TagComponent } from './tag.component';


@NgModule({
  declarations: [TagComponent],
  imports: [
    CommonModule,
    TagRoutingModule,
    SharedModule
  ]
})
export class TagModule {
}
