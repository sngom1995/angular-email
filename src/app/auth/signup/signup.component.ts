import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private passwordValidator: MatchPassword, private uniqueUsername: UniqueUsername){}

  authForm = new FormGroup({
    username : new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(12),
      Validators.pattern(/^[a-z0-ç-9]+$/),
    ], [this.uniqueUsername.validate
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20)
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20)

    ]),
  },{ validators: [this.passwordValidator.validate]} )
}
