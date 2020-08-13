import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Notification } from '@shared/models/notification.model';
import { Observable } from 'rxjs';

export interface NotificationCount {
  unseenCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) {
  }

  getUnseenNotificationCount() {
    return this.http.get<NotificationCount>(`${environment.apiUrl}/notifications/unseen`);
  }

  getNotifications(): Observable<Notification[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('JWT_TOKEN')}`
    });
    return this.http.get<Notification[]>(`${environment.apiUrl}/notifications`, {
      headers
    });
  }
}
