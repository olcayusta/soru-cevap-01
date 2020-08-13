import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from '@shared/models/question.model';

@Component({
  selector: 'app-my-favorites',
  templateUrl: './my-favorites.component.html',
  styleUrls: ['./my-favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyFavoritesComponent implements OnInit {
  questions: Question[];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.questions = this.route.snapshot.data.questions;
  }
}
