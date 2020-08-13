import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Question } from '@shared/models/question.model';
import { SearchService } from '@shared/services/search.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFormComponent implements OnInit {
  questions$: Observable<Question[]>;

  searchControl = new FormControl();

  constructor(private searchService: SearchService) {
  }

  displayFn(question?: Question): string | undefined {
    return question ? question.title : undefined;
  }

  onClosed() {
  }

  onShowAllResultsClicked() {
  }

  ngOnInit() {
    this.questions$ = this.searchControl.valueChanges
      .pipe(
        filter(value => value.length > 0),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((term: string) => this.searchService.searchQuestions(term))
      );
  }
}
