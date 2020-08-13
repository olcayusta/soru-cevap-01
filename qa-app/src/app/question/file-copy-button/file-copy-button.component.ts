import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-file-copy-button',
  templateUrl: './file-copy-button.component.html',
  styleUrls: ['./file-copy-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileCopyButtonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onFileCopyButtonClicked() {

  }
}
