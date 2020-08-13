import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-side-sheet',
  templateUrl: './side-sheet.component.html',
  styleUrls: ['./side-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideSheetComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter();

  mocks = [
    {value: '0', viewValue: 'Cevapsız sorular'},
    {value: '1', viewValue: 'Kabul edilmiş cevap yok'},
    {value: '2', viewValue: 'Ödüllü sorular'},
  ];

  selectedCheckbox;
  checkboxName;
  order;

  constructor() { }

  ngOnInit() {
  }

  applyFilter() {
  }

  onChange($event: MatCheckboxChange) {
  }
}
