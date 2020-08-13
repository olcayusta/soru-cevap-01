import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Answer } from '@shared/models/answer.model';

@Component({
  selector: 'app-user-answers',
  templateUrl: './user-answers.component.html',
  styleUrls: ['./user-answers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAnswersComponent implements OnInit {
  answers: Answer[];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.answers = this.route.snapshot.data.answers;
  }

}
