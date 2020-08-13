import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Answer } from '@shared/models/answer.model';
import { AnswerService } from '@shared/services/answer.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAnswersResolverService implements Resolve<Answer[]> {

  constructor(private answerService: AnswerService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Answer[]> | Promise<Answer[]> | Answer[] {
    return this.answerService.getAnswersByUserId(+route.parent.parent.paramMap.get('userId'));
  }
}
