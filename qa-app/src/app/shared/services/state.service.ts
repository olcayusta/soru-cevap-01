import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private sidenavOpened = new Subject<boolean>();

  sidenavOpened$ = this.sidenavOpened.asObservable();

  toggleSidenav(status: boolean) {
    this.sidenavOpened.next(status);
  }

  constructor() { }
}
