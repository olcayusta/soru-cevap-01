import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionService } from '@shared/services/question.service';
import { ChipsAutocompleteComponent } from './chips-autocomplete/chips-autocomplete.component';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateQuestionComponent implements OnInit {
  form: FormGroup;
  @ViewChild(ChipsAutocompleteComponent, {static: true}) chipsComponent: ChipsAutocompleteComponent;

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: [null, Validators.required],
      text: [null, Validators.required],
      tagIds: [[null], Validators.required]
    });
  }

  submit() {
    this.form.controls.tagIds.patchValue(this.chipsComponent.tagIds);
    const {title, text, tagIds} = this.form.value;
    this.questionService.saveQuestion(title, text, tagIds).subscribe(value => {
      this.router.navigateByUrl('/');
    });
  }
}
