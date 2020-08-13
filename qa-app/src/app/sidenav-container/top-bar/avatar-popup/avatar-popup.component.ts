import { ChangeDetectionStrategy, Component, NgModule, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@shared/material/material.module';
import { User } from '@shared/models/user.model';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-avatar-popup',
  templateUrl: './avatar-popup.component.html',
  styleUrls: ['./avatar-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarPopupComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.user = this.authService.currentUserValue;
  }

  exitToApp() {
    this.authService.logout();
    window.location.reload();
  }
}

@NgModule({
  declarations: [
    AvatarPopupComponent
  ],
  imports: [
    MaterialModule,
    RouterModule,
    MatListModule
  ]
})
class AvatarPopupModule {
}

