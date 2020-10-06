import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'https://localhost:8443/login';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials): any {
    return this.http.post(AUTH_API, {
      username: credentials.username,
      password : credentials.password
    }, httpOptions);
  }

  locale(): Observable<any> {
    return this.http.get('https://localhost:8443/locale' , httpOptions);
  }

}
