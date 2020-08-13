import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Question } from '@shared/models/question.model';
import { QuestionService } from '@shared/services/question.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecentQuestionsResolverService implements Resolve<Question[]> {

  constructor(private questionService: QuestionService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Question[]> | Promise<Question[]> | Question[] {
    return this.questionService.getLatestQuestions();
  }
}
