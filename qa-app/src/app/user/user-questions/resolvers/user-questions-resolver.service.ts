import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Question } from '@shared/models/question.model';
import { UserService } from '@shared/services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserQuestionsResolverService implements Resolve<Question[]> {

  constructor(private userService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Question[]> | Promise<Question[]> | Question[] {
    return this.userService.getQuestions(+route.parent.parent.paramMap.get('userId'));
  }
}
