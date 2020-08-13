import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsRoutingModule } from './tags-routing.module';
import { TagsComponent } from './tags.component';
import { TagListItemComponent } from './tag-list-item/tag-list-item.component';


@NgModule({
  declarations: [TagsComponent, TagListItemComponent],
  imports: [
    CommonModule,
    TagsRoutingModule
  ]
})
export class TagsModule { }
