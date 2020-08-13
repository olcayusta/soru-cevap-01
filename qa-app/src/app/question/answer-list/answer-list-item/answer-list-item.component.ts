import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Answer } from '@shared/models/answer.model';

@Component({
  selector: 'app-answer-list-item',
  templateUrl: './answer-list-item.component.html',
  styleUrls: ['./answer-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnswerListItemComponent implements OnInit {
  @Input() answer: Answer;

  constructor() {
  }

  ngOnInit() {
  }

}
