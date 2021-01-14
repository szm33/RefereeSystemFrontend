import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Match} from '../model/match';
import {MatchFunction} from '../model/matchFunction';
import {MatchToReplaceInformations} from '../replacement-match/replacement-match.component';
import {ReplaceInformationsDetails} from '../replacement-details/replacement-details.component';
import {environment} from '../../environments/environment';
import {ArrivalTime} from '../model/arrivalTime';

const URL = environment.backendURL + 'match/';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class MatchService {

    constructor(private http: HttpClient) {
    }

    getAllMatchers(): Observable<Match[]> {
        return this.http.get<Match[]>(URL, httpOptions);
    }

    createMatch(match: Match): Observable<any> {
        return this.http.post(URL, match, httpOptions);
    }

    getFreeTeamsAndReferees(date: any): Observable<any> {
        return this.http.post(URL + 'free/referees-teams', date, httpOptions);
    }

    getAllFunctions(): Observable<MatchFunction[]> {
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

    getMatch(id: number): Observable<any> {
        return this.http.get<any>(URL + id, httpOptions);
    }

    replaceReferee(matchId: number): Observable<any> {
        return this.http.post(URL + 'replace/' + matchId, {}, httpOptions);
    }

    getMatchReplaceInformations(matchId: number): Observable<ReplaceInformationsDetails[]> {
        return this.http.get<ReplaceInformationsDetails[]>(URL + 'matchReplaceInformations/' + matchId, httpOptions);
    }

    getAllReplaceInformations(): Observable<MatchToReplaceInformations[]> {
        return this.http.get<MatchToReplaceInformations[]>(URL + 'replacesInformations/', httpOptions);
    }

    sendArrivalTime(arrivalTime: ArrivalTime): Observable<any> {
        return this.http.post(URL + 'arrivalTime', arrivalTime, httpOptions);
    }

    replaceResign(replaceId: number): Observable<any> {
        return this.http.post(URL + 'resign', replaceId, httpOptions);
    }

    confirmReplacement(details: ReplaceInformationsDetails, candidateId: number): Observable<any> {
        return this.http.post(URL + 'confirmReplacement',
            {
                replaceInformationsId: details.id,
                confirmedCandidateId: candidateId,
                version: details.version
            }, httpOptions);
    }

}
