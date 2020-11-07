import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Match} from '../model/match';
import {MatchFunction} from '../model/matchFunction';

const URL = 'https://localhost:8443/match/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private http: HttpClient) { }

  getAllMatchers(): Observable<Match[]> {
    return this.http.get<Match[]>(URL, httpOptions);
  }

  createMatch(match: Match): Observable<any> {
    return this.http.post(URL, match, httpOptions);
  }

  getFreeTeamsAndReferees(date: Date): Observable<any> {
    return this.http.post(URL + 'free/referees-teams', date, httpOptions);
  }

  getAllFunctions(): Observable<MatchFunction[]>{
    return this.http.get<MatchFunction[]>(URL + 'functions', httpOptions);
  }

  getRefereeMatches(id: number): Observable<Match[]> {
    return this.http.get<Match[]>(URL + 'referee/' + id, httpOptions);
  }

  getMyMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(URL + 'my', httpOptions);
  }

  editMatch(match: Match): Observable<any> {
    return this.http.put(URL, match, httpOptions);
  }

}
