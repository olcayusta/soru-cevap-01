import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Answer } from '@shared/models/answer.model';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http: HttpClient) {
  }

  getAnswersByUserId(userId: number) {
    return this.http.get<Answer[]>(`${environment.apiUrl}/users/${userId}/answers`);
  }

  saveAnswer(answer: Answer) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('JWT_TOKEN')}`
    });
    return this.http.post(`${environment.apiUrl}/answers`, answer, {
      headers
    });
  }
}
