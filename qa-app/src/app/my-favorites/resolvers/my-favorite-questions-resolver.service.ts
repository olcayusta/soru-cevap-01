import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Question } from '@shared/models/question.model';
import { LibraryService } from '@shared/services/library.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyFavoriteQuestionsResolverService implements Resolve<Question[]> {

  constructor(private libraryService: LibraryService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Question[]> | Promise<Question[]> | Question[] {
    return this.libraryService.getFavoriteQuestions();
  }
}
