import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentQuestionsComponent } from './recent-questions.component';

describe('RecentQuestionsComponent', () => {
  let component: RecentQuestionsComponent;
  let fixture: ComponentFixture<RecentQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
