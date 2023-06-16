import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl } from '@angular/forms';
import { Observable, catchError, map, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UniqueUsername implements AsyncValidator {

  constructor(private http: HttpClient){}

  validate =(control: AbstractControl) =>{
    const { value } = control;
    console.log(this.http);
    return  this.http.post<any>('https://api.angular-email.com/auth/username', {username: value}).pipe(
      map((value) => {
      console.log(value);
      return null
      }),
      catchError((err) => {
        console.log(err);
        return of({usernameMustBeUnique: true})
      })
    )
  }
}
