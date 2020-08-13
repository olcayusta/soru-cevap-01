import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileCopyButtonComponent } from './file-copy-button.component';

describe('FileCopyButtonComponent', () => {
  let component: FileCopyButtonComponent;
  let fixture: ComponentFixture<FileCopyButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileCopyButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileCopyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
