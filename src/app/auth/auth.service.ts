import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject} from 'rxjs';
import { tap } from 'rxjs/operators';

interface UsernameAvailableResponse {
  available: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  signedin$ = new BehaviorSubject(false);
  usernameAvailable(username: string){
    return this.http.post<UsernameAvailableResponse>('https://api.angular-email.com/auth/username', {
      username
    })
    .pipe(
      tap((response) => {
        console.log(response);
        this.signedin$.next(true);
      })
    );
  }
}
