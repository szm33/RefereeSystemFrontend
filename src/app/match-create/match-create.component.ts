import {Component, OnInit, ViewChild} from '@angular/core';
import {Match} from '../model/match';
import {MatchService} from '../_services/match.service';
import {Referee} from '../model/referee';
import {Team} from '../model/team';
import {MatchFunction} from '../model/matchFunction';
import {Router} from '@angular/router';

@Component({
    selector: 'app-match-create',
    templateUrl: './match-create.component.html',
    styleUrls: ['./match-create.component.css']
})
export class MatchCreateComponent implements OnInit {

    match: Match = new Match();
    freeReferees: Referee[] = [];
    freeTeams: Team[] = [];
    matchFunctions: Map<MatchFunction, Referee> = new Map();
    selectedTeams: Map<boolean, Team> = new Map().set(false, null).set(true, null);
    date: any;

    pickDateOfMatch(event) {
        debugger;
        this.freeTeams = [];
        this.freeReferees = [];
        // this.match.dateOfMatch = null;
        if (event.value != null) {
            let date = [];
            date.push(event.value.toArray()[0]);
            date.push(event.value.toArray()[1] + 1);
            date.push(event.value.toArray()[2]);
            this.matchService.getFreeTeamsAndReferees(date).subscribe(data => {
                debugger;
                this.freeReferees.push(new Referee());
                data.referees.forEach(referee => this.freeReferees.push(referee));
                data.teams.forEach(team => this.freeTeams.push(team));
                this.date = event.value;
            });
        }
    }

    selectReferee(event, matchFunction) {
        this.matchFunctions.set(matchFunction, event.value);
    }

    selectTeam(event, isGuest: boolean) {
        debugger;
        this.selectedTeams.set(isGuest, event.value);
    }

    constructor(private matchService: MatchService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.matchService.getAllFunctions().subscribe(data => data.forEach(matchFunction => this.matchFunctions.set(matchFunction, null)),
            () => {
            });
    }

    createMatch() {
        debugger;
        this.match.dateOfMatch = [];
        this.match.dateOfMatch.push(this.date.toArray()[0]);
        this.match.dateOfMatch.push(this.date.toArray()[1] + 1);
        this.match.dateOfMatch.push(this.date.toArray()[2]);
        console.log(this.match.dateOfMatch);
          this.selectedTeams.forEach((team, isGuest) => {
            if (team != null) {
              if (isGuest) {
                this.match.awayTeamId = team.id;
              } else {
                this.match.homeTeamId = team.id;
              }
            }
          });
          this.matchFunctions.forEach((referee, matchFunction) => {
            if(referee != null && referee.id ) {
              referee.function = matchFunction.functionName;
              this.match.referees.push(referee);
            }
          });
          this.matchService.createMatch(this.match).subscribe(() => this.router.navigate(['match']),
              () => window.alert("failed create"));
    }

}
