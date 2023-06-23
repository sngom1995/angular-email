import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(
    private passwordValidator: MatchPassword,
    private uniqueUsername: UniqueUsername,
    private authService: AuthService
    ){}

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
  onSubmit(){
    const {username, password, passwordConfirmation} = this.authForm.value;

        if(this.authForm.invalid){
      return;
    }
    this.authService.signup(this.authForm.value)
      .subscribe({
        next: (response) => {
          console.log(response)
        },
        error: (err) => {
          if(!err.status)
          {
            this.authForm.setErrors({noConnection: true})
          }
          else{
            this.authForm.setErrors({unkownError: true})
          }
          console.log(err)
        }
      })
  }
}
