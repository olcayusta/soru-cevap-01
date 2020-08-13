import { Component, OnInit, ChangeDetectionStrategy, ViewChildren, QueryList } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatMenuItem } from '@angular/material/menu';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  @ViewChildren('sortMenuItem') items: QueryList<MatMenuItem>;

  activeMenuText;

  filters = [
    {path: '', viewValue: 'Tümü'},
    {path: '', viewValue: 'Cevap bekleyen'},
    {path: '', viewValue: 'Doğru cevap bekleyen'},
    {path: '', viewValue: 'Çözülmüş sorular'},
  ];

  sorters = [
    {path: 'newest', viewValue: 'Eklenme tarihi (en yeni)'},
    {path: '', viewValue: 'Güncelleme tarihi (en yeni)'},
    {path: '', viewValue: 'Oy sayısı (en yüksek)'}
  ];

  foods = [
    {value: 'unanswered', viewValue: 'Doğru cevap bekleyen'},
    {value: 'noanswers', viewValue: 'Cevap bekleyen'},
    {value: 'answered', viewValue: 'Doğru cevap almış'},
  ];

  menuItems = [
    {value: 'trending', viewValue: 'Eklenme tarihi (en yeni)'},
    {value: 'trending', viewValue: 'Güncellenme tarihi'},
    {value: 'trending', viewValue: 'Oy (en yüksek)'},
    {value: 'trending', viewValue: 'Frekans (en yüksek)'},
    {value: 'trending', viewValue: 'Bounty bitecek olanlar'},
  ];

  filterControl = new FormControl(this.filters[0]);
  sorterControl = new FormControl(this.sorters[0]);

  constructor() {
  }

  ngOnInit() {
  }

  onSelectionChange($event: MatSelectChange) {
    const path = $event.value.value;
    // this.router.navigate([`${path}`]);
  }

  menuItemClicked(index: number) {
    const items = this.items.toArray();
    items.map(value => {
      if (value._highlighted) {
        value._highlighted = false;
      }
    });
    items[index]._highlighted = true;
    console.log(this.menuItems[index]);
    this.activeMenuText = this.menuItems[index].viewValue;
  }
}
