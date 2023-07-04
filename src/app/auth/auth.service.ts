import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject} from 'rxjs';
import { tap } from 'rxjs/operators';

interface UsernameAvailableResponse {
  available: boolean;
}

interface SignUpCredential {
  username?: string | null;
  password?: string | null;
  passwordConfirmation?: string | null;
}

interface SignUpResponse {
  username: string;
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  rootUrl = 'https://api.angular-email.com'

  constructor(private http: HttpClient) { }
  signedin$ = new BehaviorSubject(false);
  usernameAvailable(username: string){
            return this.http.post<UsernameAvailableResponse>(`${this.rootUrl}/auth/username`, {
      username
    })
    .pipe(
      tap((response) => {
        console.log(response);
        this.signedin$.next(true);
      })
    );
  }

  signup(credentials: SignUpCredential){
      return this.http.post<SignUpResponse>(`${this.rootUrl}/auth/signup`, credentials)
  }
}
