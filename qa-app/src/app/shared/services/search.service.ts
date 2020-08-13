import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Question } from '@shared/models/question.model';
import { Tag } from '@shared/models/tag.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {
  }

  searchQuestions(searchTerm: string): Observable<Question[]> {
    return this.http.post<Question[]>(`${environment.apiUrl}/search/question`, {
      searchTerm
    });
  }

  searchTag(searchTerm: string): Observable<Tag[]> {
    return this.http.post<Tag[]>(`${environment.apiUrl}/search/tag`, {
      searchTerm
    });
  }
}
