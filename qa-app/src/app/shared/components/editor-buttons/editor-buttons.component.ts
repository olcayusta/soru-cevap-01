import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-editor-buttons',
  templateUrl: './editor-buttons.component.html',
  styleUrls: ['./editor-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorButtonsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
