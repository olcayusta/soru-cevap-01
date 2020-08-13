import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideSheetComponent } from './side-sheet.component';

describe('SideSheetComponent', () => {
  let component: SideSheetComponent;
  let fixture: ComponentFixture<SideSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
