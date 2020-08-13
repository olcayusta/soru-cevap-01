import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Answer } from '@shared/models/answer.model';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnswerListComponent implements OnInit {
  @Input() answers: Answer[];

  constructor() {
  }

  ngOnInit() {
  }

}
