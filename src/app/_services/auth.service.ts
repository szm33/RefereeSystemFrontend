import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, mapTo, tap} from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import {environment} from '../../environments/environment';


const URL = environment.backendURL + 'login/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private redirectAfterLogin: String;

  public setRedirectAfterLogin(url: String) {
    this.redirectAfterLogin = url;
  }

  public getRedirectAfterLogin() {
    return this.redirectAfterLogin;
  }

  constructor(private http: HttpClient) { }

  // login(credentials): any {
  //   return this.http.post(URL, {
  //     username: credentials.username,
  //     password : credentials.password
  //   }, httpOptions);
  // }

  locale(): Observable<any> {
    return this.http.get('https://localhost:8443/locale' , httpOptions);
  }



  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: String;


  login(user: { username: String, password: String }): Observable<boolean> {
    return this.http.post<any>(URL, user)
        .pipe(
            tap(tokens => this.doLoginUser(user.username, tokens)),
            mapTo(true),
            catchError(error => {
              return of(false);
            }));
  }

  logout() {
    return this.http.post<any>('https://localhost:8443/logout/', {
      'refreshToken': this.getRefreshToken()});
    // }).pipe(
    //     tap(() => this.doLogoutUser()),
    //     mapTo(true),
    //     catchError(error => {
    //       alert(error.error);
    //       return of(false);
    //     }));
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    console.log("wywolany refresh");
    return this.http.post<any>(`https://localhost:8443/refresh/`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.jwt);
    }));
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: String, tokens: Tokens) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  public doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  public removeJwtToken() {
    localStorage.removeItem(this.JWT_TOKEN);
  }

  public getDecodedToken(): Token {
    return jwt_decode(localStorage.getItem(this.JWT_TOKEN));
  }

  public getUsername() {
    return this.getDecodedToken().sub;
  }

  public isAdmin(): boolean {
    return this.isLoggedIn() ? !!this.getDecodedToken().roles.find(token => token.authority == 'ROLE_ADMIN') : false;
  }

  public getId(): number {
    return this.isLoggedIn() ? this.getDecodedToken().id : null;
  }

}

 class Tokens {
  jwt: string;
  refreshToken: string;
}

class Token {
  sub: String;
  roles: { authority: String}[];
  id: number;
}
