import { ChangeDetectionStrategy, Component, ɵmarkDirty as markDirty } from '@angular/core';
import { ResolveEnd, ResolveStart, Router } from '@angular/router';
import { fadeInOutAnimation } from '@shared/animations/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInOutAnimation
  ],
})
export class AppComponent {
  // title = 'qa-app';
  spinner = false;

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof ResolveStart) {
        this.spinner = true;
        markDirty(this);
      }

      if (event instanceof ResolveEnd) {
        this.spinner = false;
        markDirty(this);
      }
    });
  }
}
