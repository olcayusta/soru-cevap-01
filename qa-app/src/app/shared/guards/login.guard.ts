import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad {

  constructor(private authService: AuthService, private router: Router) {
  }

  async canLoad(
    route: Route,
    segments: UrlSegment[]): Promise<boolean> {
    if (this.authService.currentUserValue) {
      await this.router.navigateByUrl('/');
      return false;
    } else {
      return true;
    }
  }
}
