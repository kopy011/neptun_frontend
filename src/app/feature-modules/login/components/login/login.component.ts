import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loginAction } from 'src/app/feature-modules/shared/store/shared.actions';

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private store: Store) {}

  jwtToken$!: Observable<string | undefined>;
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const loginFormValue: {
        username: string;
        password: string;
      } = this.loginForm.value;
      this.store.dispatch(
        loginAction({
          username: loginFormValue.username,
          password: loginFormValue.password,
        })
      );
    } else {
      Object.values(this.loginForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
