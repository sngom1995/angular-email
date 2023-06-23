import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl } from '@angular/forms';
import { Observable, catchError, map, of } from "rxjs";
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UniqueUsername implements AsyncValidator {

  constructor(private authService:AuthService){}

  validate =(control: AbstractControl) =>{
    const { value } = control;

    return  this.authService.usernameAvailable(value).pipe(
      map((value) => {
      console.log(value);
      return null
      }),
      catchError((err) => {
        //console.log(err);
        console.log(err);
        if (err.error.username){
          return of({noUsernameUnique: true})
        }
        else {
          return of({noConnection: true})
        }
      })
    )
  }
}
