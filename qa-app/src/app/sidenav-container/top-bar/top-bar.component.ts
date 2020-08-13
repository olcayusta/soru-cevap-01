import { CdkOverlayOrigin, Overlay, ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  Type,
  ViewChild
} from '@angular/core';
import { User } from '@shared/models/user.model';
import { AuthService } from '../../auth/auth.service';
import { AvatarPopupComponent } from './avatar-popup/avatar-popup.component';
import { NotificationPopupComponent } from './notification-popup/notification-popup.component';
import { ɵmarkDirty as markDirty, ɵdetectChanges as detectChanges } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopBarComponent implements OnInit {
  @Output() openSidenav = new EventEmitter();
  @Output() openSideSheet = new EventEmitter();

  avatarPopupComponent: Type<AvatarPopupComponent>;
  notificationPopupComponent: Type<NotificationPopupComponent>;

  user: User;

  scrollStrategy: ScrollStrategy;
  scrollStrategy2: ScrollStrategy;

  avatarOpened;
  notificationOpened;

  state = 0;

  /*@ViewChild('avatarButton', {read: ElementRef, static: true}) avatarButton: ElementRef<HTMLButtonElement>;
  @ViewChild('notificationButton', {read: ElementRef, static: true}) notificationButton: ElementRef<HTMLButtonElement>;*/
  isOpened = false;
  isOpened2 = false;

  @HostListener('document:click', ['$event.target'])
  public onClick(target) {
    /*    this.isOpened = false;
        this.isOpened2 = false;*/
    /*  if (this.avatarOpened) {
        const button = document.querySelector('#avatarButton');
        const comp = document.querySelector('app-avatar-popup');
        if (button.contains(target) || comp.contains(target)) {
          return;
        } else {
          this.avatarOpened = false;
        }
      }

      if (this.notificationOpened) {
        const button2 = document.querySelector('#notificationButton');
        const comp2 = document.querySelector('app-notification-popup');
        if (button2.contains(target) || comp2.contains(target)) {
          return;
        } else {
          this.notificationOpened = false;
        }
      }*/

    /*    if (this.avatarOpened) {
          this.avatarOpened = false;
        }
        if (this.notificationOpened) {
          this.notificationOpened = false;
        }*/
  }

  constructor(
    private authService: AuthService,
    private sso: ScrollStrategyOptions,
    private cdr: ChangeDetectorRef,
    public overlay: Overlay,
    public overlay2: Overlay,
  ) {
    this.scrollStrategy = this.overlay.scrollStrategies.close();
    this.scrollStrategy2 = this.overlay2.scrollStrategies.close();
  }

  ngOnInit() {
    this.user = this.authService.currentUserValue;
  }

  async openPopup($event) {
    // $event.stopPropagation();
    this.isOpened2 = false;
    const {AvatarPopupComponent: avatarPopupComponent} = await import('./avatar-popup/avatar-popup.component');
    this.avatarPopupComponent = avatarPopupComponent;
    this.isOpened = true;
    markDirty(this);
  }

  async openPopup2($event) {
    // $event.stopPropagation();
    this.isOpened = false;
    const {NotificationPopupComponent: notificationPopupComponent} = await import('./notification-popup/notification-popup.component');
    this.notificationPopupComponent = notificationPopupComponent;
    this.isOpened2 = true;
    markDirty(this);
  }
}
