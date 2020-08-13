import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@shared/material/material.module';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { OutsideClickDirective } from './directives/outside-click.directive';
import { EditorButtonsComponent } from './components/editor-buttons/editor-buttons.component';
import { SearchHighlightPipe } from './pipes/search-highlight.pipe';
import { SnackComponent } from './components/snack/snack.component';
import { LazyLoadImgDirective } from './directives/lazy-load-img.directive';

@NgModule({
  declarations: [
    QuestionListComponent,
    OutsideClickDirective,
    EditorButtonsComponent,
    SearchHighlightPipe,
    SnackComponent,
    LazyLoadImgDirective
  ],
  exports: [
    QuestionListComponent,
    OutsideClickDirective,
    EditorButtonsComponent,
    SearchHighlightPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ]
})
export class SharedModule {
}
