import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewContainerRef,
  ViewChild,
  OnDestroy,
  AfterViewInit,
  ɵmarkDirty as markDirty
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from '@shared/models/question.model';
import { Subscription } from 'rxjs';

declare var PR;

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionComponent implements OnInit, AfterViewInit, OnDestroy {
  question: Question;

  @ViewChild('commentList', {read: ViewContainerRef}) commentVcr: ViewContainerRef;

  subscription: Subscription;

  constructor(
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.subscription = this.route.data.subscribe(value => {
      this.question = value.question;
      markDirty(this);
    });
  }

  ngAfterViewInit(): void {
    document.querySelectorAll('pre').forEach(value => {
      value.classList.add('prettyprint');
    });
    PR.prettyPrint();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
