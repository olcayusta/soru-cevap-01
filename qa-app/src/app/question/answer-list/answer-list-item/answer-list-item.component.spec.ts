import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerListItemComponent } from './answer-list-item.component';

describe('AnswerListItemComponent', () => {
  let component: AnswerListItemComponent;
  let fixture: ComponentFixture<AnswerListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
