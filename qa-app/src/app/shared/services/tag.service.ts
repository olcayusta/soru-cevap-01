import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Tag } from '@shared/models/tag.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) {
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${environment.apiUrl}/tags`);
  }

  getTagWithQuestions(tagId: number): Observable<Tag> {
    return this.http.get<Tag>(`${environment.apiUrl}/questions/tagged/${tagId}`);
  }
}
