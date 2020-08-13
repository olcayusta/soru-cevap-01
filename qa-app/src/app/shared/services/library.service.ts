import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Question } from '@shared/models/question.model';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private http: HttpClient) {
  }

  getFavoriteQuestions() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('JWT_TOKEN')}`
    });
    return this.http.get<Question[]>(`${environment.apiUrl}/account/favorites`, {
      headers
    });
  }
}
