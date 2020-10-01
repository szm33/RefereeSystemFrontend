import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const URL = 'http://localhost:8080/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getMyAccount(): Observable<any> {
    return this.http.get(URL + 'myaccount', httpOptions);
  }

  modifyMyAccount(account: any): Observable<any> {
    return this.http.put(URL + 'account', account, httpOptions);
  }

  changePassword(password: any): Observable<any> {
    return this.http.post(URL + 'account/password', password, httpOptions);
  }
}

