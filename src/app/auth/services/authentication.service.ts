import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap, mapTo, catchError, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Tokens } from '../models/Tokens';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private configUrl: string = environment.domain;

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;

  constructor(
    private http: HttpClient,
  ) { }

  login(username: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const user = {
      email: username,
      password: password
    };

    // const user = new HttpParams()
    //   .set('username', username)
    //   .set('password', password);
    
    return this.http.post(`http://localhost:8082/api/v1/users/login`, user, { headers: headers})
      .pipe(
        tap(tokens => {
          // console.log(tokens);

          this.doLoginUser(username, tokens)
        }),
        mapTo(true),
        catchError(error => {
          console.log(error.error);
          return of(false);
        })
      );
  }
  // login(username: string, password: string): Observable<any> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

  //   // const credentials = `username=${username}&password=${password}`;
  //      const params = new HttpParams()
  //     .set('username', username)
  //     .set('password', password);
  //   return this.http.post(`${this.configUrl}/auth/login`, params, { headers: headers, responseType: 'text' });
  //   // .pipe(map(res => {
  //   //   console.log(res);

  //   // }));
  // }

  /** */
  // logout() {
  //   return this.http.post<any>(this.configUrl + '/auth/logout', { 'refreshToken': this.getRefreshToken() })
  //     .pipe(
  //       tap(() => this.doLogoutUser()),
  //       mapTo(true),
  //       catchError(error => {
  //         console.log(error.error);
  //         return of(false);
  //       })
  //     );
  // }
  logout() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`http://localhost:8082/api/v1/logout`, { headers: headers })
      .pipe(
        tap(() => this.doLogoutUser()),
        mapTo(true),
        catchError(error => {
          console.log(error.error);
          return of(false);
        })
      );
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    return this.http.post<any>(this.configUrl + '/refresh', {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap((tokens: Tokens) => {
        this.storeJwtToken(tokens.jwt);
      })
    )
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: string, tokens: any) {
    this.loggedUser = username;
    // console.log('logged user', this.loggedUser);

    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: any) {

    localStorage.setItem(this.JWT_TOKEN, tokens.token);
    // localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken)
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    // localStorage.removeItem(this.REFRESH_TOKEN);
  }


  logedInUser(): Observable<any> {
    return this.http.get<any>(`${this.configUrl}/api/v1/users/signedIn`);
  }
}
