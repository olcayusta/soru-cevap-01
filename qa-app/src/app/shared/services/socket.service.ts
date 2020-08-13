import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  subject: WebSocketSubject<any>;

  constructor() {
    this.subject = webSocket({
      url: 'ws://localhost:3000/notification',
      protocol: localStorage.getItem('JWT_TOKEN')
    });
  }

  emit(eventName: string, data: object) {
    this.subject.next(data);
  }

  on(eventName: string) {
    return new Observable(subscriber => {
      this.subject.subscribe(value => {
        if (value.event === eventName) {
          console.log(value.event);
          subscriber.next(value);
        }
      });
    });
  }
}
