import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MaterialModule } from '@shared/material/material.module';
import { Notification } from '@shared/models/notification.model';
import { NotificationService } from '@shared/services/notification.service';
import { SharedModule } from '@shared/shared.module';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification-popup',
  templateUrl: './notification-popup.component.html',
  styleUrls: ['./notification-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationPopupComponent implements OnInit {
  notifications$: Observable<Notification[]>;

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.notifications$ = this.notificationService.getNotifications();
  }
}

@NgModule({
  declarations: [
    NotificationPopupComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatListModule,
    SharedModule
  ]
})
class NotificationPopupModule {
}
