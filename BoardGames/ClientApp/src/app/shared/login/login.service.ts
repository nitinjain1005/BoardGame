import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
  // class for login
export class LoginService {
  constructor(private http: HttpClient, @Inject('BASE_URL') public baseUrl: string) { }
  accessToken: string;
  currentUser: string = null;
  redirectUrl: string;
  public endpoint = this.baseUrl + '/api/Auth/GenerateToken';
  public get isLoggedIn(): boolean {
    if (localStorage.getItem('userName') == null) {
      return false;
    } else {
      return true;
    }
  }
  // logout method
  logout(): void {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires');
    localStorage.removeItem('userName');
    this.currentUser = null;
  }
  //method for token expiration
  getExpiration() {
    const expiration = localStorage.getItem('expires');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  // setting session as a local storage for login 
  private setSession(authResult, userName) {
    const expiresAt = moment().add(authResult.expires, 'second');
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem('expires', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('userName', userName);
    return authResult;
  }


  public LoginIn(userName: string, password: string): Observable<TokenParams> {
    const credentials = {
      LoginId: userName,
      Password: password
    };

    return this.http.post(this.endpoint, credentials, httpOptions).pipe(map(res => this.setSession(res, userName)),
      catchError(this.handleError<any>('Login'))
    );
  }

  private handleError<T>(operation = 'Login', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return throwError(error);
    };
  }
}
export interface TokenParams {
  token: string;
  expiration: string;
}

