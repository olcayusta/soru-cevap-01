import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-avatar-icon',
  templateUrl: 'avatar.svg',
  styleUrls: ['./avatar-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarIconComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
