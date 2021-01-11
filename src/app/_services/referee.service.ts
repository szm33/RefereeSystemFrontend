import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Referee} from '../model/referee';
import {environment} from '../../environments/environment';

const URL = environment.backendURL + 'referee/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class RefereeService {

  constructor(private http: HttpClient) {
  }

  getAllReferee(): Observable<Referee[]> {
    return this.http.get<Referee[]>(URL, httpOptions);
}

  addReferee(referee: Referee): Observable<Referee> {
    return this.http.post<Referee>(URL, referee, httpOptions);
  }

  getReferee(id : String): Observable<Referee> {
    return this.http.get<Referee>(URL + id, httpOptions);
  }

  getRefereesLicenses(): Observable<any> {
    return this.http.get<any>(URL + 'license', httpOptions);
  }

  modifyReferee(referee: Referee): Observable<Referee> {
    referee.id = null;
    return this.http.put<Referee>(URL, referee, httpOptions);
  }

  changeActiveStatus(id: String): Observable<any> {
    return this.http.post(URL + id + '/active', null, httpOptions);
  }
}

