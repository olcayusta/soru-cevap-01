import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from '@shared/models/question.model';

@Component({
  selector: 'app-recent-questions',
  templateUrl: './recent-questions.component.html',
  styleUrls: ['./recent-questions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentQuestionsComponent implements OnInit {
  questions: Question[];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.questions = this.route.snapshot.data.questions;
  }
}
