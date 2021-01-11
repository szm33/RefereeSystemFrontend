import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Team} from '../model/team';
import {League} from '../model/league';
import {environment} from '../../environments/environment';

const URL = environment.backendURL + 'team/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  getAllTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(URL, httpOptions);
  }

  getTeam(id: number): Observable<Team> {
    return this.http.get<Team>(URL + id, httpOptions);
  }

  addTeam(team: any): Observable<Team> {
    return this.http.post<Team>(URL, team, httpOptions);
  }

  getAllLeagues(): Observable<League[]> {
    return this.http.get<League[]>(URL + 'league', httpOptions);
  }

  editTeam(team: Team): Observable<any> {
    return this.http.put(URL, team, httpOptions);
  }
}
