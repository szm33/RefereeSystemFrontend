import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Account} from '../model/account';

const URL = 'https://localhost:8443/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getMyAccount(): Observable<Account> {
    return this.http.get<Account>(URL + 'myaccount', httpOptions);
  }

  modifyMyAccount(account: Account): Observable<Account> {
    return this.http.put<Account>(URL + 'account', account, httpOptions);
  }

  changePassword(password: any): Observable<Account> {
    return this.http.post<Account>(URL + 'account/password', password, httpOptions);
  }

  sendResetLink(username: String): Observable<any> {
    return this.http.get(URL + 'account/reset/' + username, httpOptions);
  }

  validateLink(link: String): Observable<any> {
    return this.http.get(URL + 'validate/' + link, httpOptions);
  }

  resetPassword(password: any): Observable<any> {
    return this.http.post(URL + 'account/reset', password, httpOptions);
  }
}

