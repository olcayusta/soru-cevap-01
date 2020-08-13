import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Inject, ViewChild, Type, ɵmarkDirty as markDirty } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SocketService } from '@shared/services/socket.service';
import { StateService } from '@shared/services/state.service';
import { Observable } from 'rxjs';
import { NavDrawerComponent } from './nav-drawer/nav-drawer.component';

@Component({
  selector: 'app-sidenav-container',
  templateUrl: './sidenav-container.component.html',
  styleUrls: ['./sidenav-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavContainerComponent implements OnInit {
  @ViewChild('sidenav')
  sidenav: MatSidenav;

  drawerComponent: Type<NavDrawerComponent>;

  sidenavOpened$: Observable<boolean>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private socketService: SocketService,
    private snackBar: MatSnackBar,
    private router: Router,
    private stateService: StateService
  ) {
    /*    this.socketService.on('celeb').subscribe(value => {
      console.log(value);
    });

    this.socketService.on('news').subscribe(value => {
      console.log(value);
    });*/
  }

  drawerOpenedStart() {
    // this.document.body.style.overflow = 'hidden';
  }

  drawerclosedStart() {
    // this.document.body.style.overflow = '';
  }

  ngOnInit() {
    this.socketService.on('answered question').subscribe((value: any) => {
      this.snackBar.open(`${value.payload.questionId} sorunuz cevaplandı`, 'GÖSTER')
        .onAction().subscribe(value1 => {
          this.router.navigate(['/question', value.payload.questionId]);
      });
    });

    this.sidenavOpened$ = this.stateService.sidenavOpened$;
  }

  async sidenavOpenRequest() {
    const {NavDrawerComponent: navDrawerComponent} = await import('./nav-drawer/nav-drawer.component');
    this.drawerComponent = navDrawerComponent;
    markDirty(this);
    this.sidenav.open();
  }
}
