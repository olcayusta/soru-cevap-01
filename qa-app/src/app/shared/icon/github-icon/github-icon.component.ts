import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-github-icon',
  templateUrl: 'github.svg',
  styleUrls: ['./github-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GithubIconComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
