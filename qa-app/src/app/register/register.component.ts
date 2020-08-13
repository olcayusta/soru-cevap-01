import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  blobUrl;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private domSanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      avatarUrl: [null, Validators.required]
    });
  }

  submit() {
    const {email, password} = this.form.value;
    this.userService.saveUser(email, password).subscribe(value => {
      if (value) {
        console.log('Basarili');
      }
    });
  }

  onChange($event: Event) {
    const target = $event.target as HTMLInputElement;
    const file = target.files[0];
    this.blobUrl = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));

/*    this.uploadService.uploadPhoto(file).subscribe(value => {
      target.value = '';
    });*/
  }
}
