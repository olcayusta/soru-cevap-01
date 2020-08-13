import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Question } from '@shared/models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) {
  }

  getQuestion(questionId: number) {
    return this.http.get<Question>(`${environment.apiUrl}/questions/${questionId}`);
  }

  getLatestQuestions() {
    return this.http.get<Question[]>(`${environment.apiUrl}/questions`);
  }

  getQuestionsWithNoAnswers() {
    return this.http.get<Question[]>(`${environment.apiUrl}/questions/noanswers`);
  }

  getQuestionsWithAnswered() {
    return this.http.get<Question[]>(`${environment.apiUrl}/questions/answered`);
  }

  getUnansweredQuestions() {
    return this.http.get<Question[]>(`${environment.apiUrl}/questions/unanswered`);
  }

  getQuestionsByUserId(userId: number) {
    return this.http.get<Question[]>(`${environment.apiUrl}/users/${userId}/questions`);
  }

  saveQuestion(title: string, text: string, tagIds: number[]) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('JWT_TOKEN')}`
    });
    return this.http.post<Question>(`${environment.apiUrl}/questions`, {title, text, tagIds}, {
      headers
    });
  }

  loadMoreQuestion(offset: number) {
    return this.http.get<Question[]>(`${environment.apiUrl}/questions/load/${offset}`);
  }
}
