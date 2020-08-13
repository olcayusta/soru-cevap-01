import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@shared/material/material.module';
import { StateService } from '@shared/services/state.service';

@Component({
  selector: 'app-nav-drawer',
  templateUrl: './nav-drawer.component.html',
  styleUrls: ['./nav-drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavDrawerComponent implements OnInit {

  constructor(private stateService: StateService) { }

  ngOnInit() {
  }

  closeSidenav() {
    this.stateService.toggleSidenav(false);
  }

  listItemClicked() {
    console.log('clicked')
    //this.stateService.toggleSidenav(false);
  }
}

@NgModule({
  declarations: [
    NavDrawerComponent
  ],
  imports: [
    MaterialModule,
    MatListModule,
    RouterModule
  ]
})
class NavDrawerModule {}
