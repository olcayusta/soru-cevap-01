import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { environment } from '@environments/environment';
import { Question } from '@shared/models/question.model';
import { SearchService } from '@shared/services/search.service';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  questions$: Observable<Question[]>;

  searchTerm;

  constructor(private route: ActivatedRoute, private searchService: SearchService) {
  }

  ngOnInit() {
    this.questions$ = this.route.paramMap.pipe(
      tap((params: ParamMap) => {
        //  this.title.setTitle(`${params.get('searchTerm')} - ${environment.appName}`);
        this.searchTerm = params.get('searchTerm');
      }),
      switchMap((params: ParamMap) => this.searchService.searchQuestions(params.get('searchTerm')))
    );
  }
}
