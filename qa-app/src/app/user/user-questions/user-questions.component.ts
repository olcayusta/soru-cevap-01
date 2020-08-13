import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from '@shared/models/question.model';

@Component({
  selector: 'app-user-questions',
  templateUrl: './user-questions.component.html',
  styleUrls: ['./user-questions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserQuestionsComponent implements OnInit {
  questions: Question[];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.questions = this.route.snapshot.data.questions;
  }
}
