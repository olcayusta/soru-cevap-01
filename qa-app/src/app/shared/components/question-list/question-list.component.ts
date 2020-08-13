import { Component, OnInit, ChangeDetectionStrategy, Input, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Question } from '@shared/models/question.model';
import { QuestionService } from '@shared/services/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionListComponent implements OnInit, AfterViewInit {
  @Input() questions: Question[];
  @Input() loadMore = false;

  @ViewChild('scrollTrigger', {static: false, read: ElementRef}) scrollTrigger: ElementRef;
  offset = 0;
  dataLoaded = false;

  constructor(
    private questionService: QuestionService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.offset += 6;
          observer.disconnect();
          this.questionService.loadMoreQuestion(this.offset).subscribe(value => {
            if (value.length > 0) {
              this.questions.push(...value);
              observer.observe(this.scrollTrigger.nativeElement);
              this.cdr.markForCheck();
              // this.location.replaceState(`${this.offset}`);
            } else {
              // console.log('Veri bitti!');
              observer.unobserve(this.scrollTrigger.nativeElement);
              this.dataLoaded = true;
              this.cdr.markForCheck();
            }
          });
        }
      });
    });

    if (this.loadMore) {
      observer.observe(this.scrollTrigger.nativeElement);
    }
  }

}
