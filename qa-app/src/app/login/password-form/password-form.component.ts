import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@shared/models/user.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordFormComponent implements OnInit {
  form: FormGroup;
  hidePassword = true;

  user: User;

  constructor(private fb: FormBuilder, private authService: AuthService, private cdr: ChangeDetectorRef, private router: Router) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.form = this.fb.group({
      password: [null, Validators.required]
    });
  }

  submit() {
    const {email} = JSON.parse(localStorage.getItem('currentUser')) as User;
    const {password} = this.form.value;
    this.authService.passwordValidate(email, password).subscribe(value => {
      if (value.error) {
        this.form.get('password').setErrors({
          wrong: true
        });
        this.cdr.markForCheck();
      } else {
        // this.router.navigateByUrl('/');
      }
    });
  }
}
