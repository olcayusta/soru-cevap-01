import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['olcay@mail.com', [Validators.required, Validators.email]]
    }, {updateOn: 'submit'});
  }

  submit() {
    const {email} = this.form.value;
    this.authService.emailValidate(email).subscribe(value => {
      localStorage.setItem('currentUser', JSON.stringify(value));
      this.router.navigateByUrl('/login/password');
    });
  }
}
