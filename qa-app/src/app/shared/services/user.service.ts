import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Question } from '@shared/models/question.model';
import { User } from '@shared/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${userId}`);
  }

  saveUser(email: string, password: string) {
    return this.http.post(`${environment.apiUrl}/users`, {email, password});
  }

  getQuestions(userId: number) {
    return this.http.get<Question[]>(`${environment.apiUrl}/users/${userId}/questions`);
  }
}
