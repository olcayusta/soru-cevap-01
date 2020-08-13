import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Answer } from '@shared/models/answer.model';
import { AnswerService } from '@shared/services/answer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reply-form',
  templateUrl: './reply-form.component.html',
  styleUrls: ['./reply-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReplyFormComponent implements OnInit {
  answerControl = new FormControl();
  @Input() questionId: number;

  subscription: Subscription;

  constructor(private answerService: AnswerService) {
  }

  ngOnInit() {
  }

  submit() {
    const answer = new Answer(this.answerControl.value, this.questionId);
    this.subscription = this.answerService.saveAnswer(answer).subscribe(value => {
      console.log(value);
    });
  }
}
