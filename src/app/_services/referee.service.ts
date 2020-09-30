import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const URL = 'http://localhost:8080/referee/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class RefereeService {

  constructor(private http: HttpClient) {
  }

  getAllReferee(): Observable<any> {
    return this.http.get(URL, httpOptions);
}

  addReferee(referee: any): Observable<any> {
    return this.http.post(URL, referee, httpOptions);
  }

  getReferee(id : String): Observable<any> {
    return this.http.get(URL + id, httpOptions);
  }

  getRefereesLicenses(): Observable<any> {
    return this.http.get('http://localhost:8080/license', httpOptions);
  }

  modifyReferee(referee: any): Observable<any> {
    console.log(referee);
    return this.http.put(URL, referee, httpOptions);
  }

}

