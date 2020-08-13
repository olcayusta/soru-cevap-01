import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-google-icon',
  templateUrl: 'google.svg',
  styleUrls: ['./google-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoogleIconComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
