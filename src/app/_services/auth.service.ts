import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/login';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  referee(): Observable<any> {
    return this.http.get('http://localhost:8080/referee' , httpOptions);
  }

  login(credentials): any {
    return this.http.post(AUTH_API, {
      username: credentials.username,
      password : credentials.password
    }, httpOptions);
  }

  locale(): Observable<any> {
    return this.http.get('http://localhost:8080/locale' , httpOptions);
  }

}
