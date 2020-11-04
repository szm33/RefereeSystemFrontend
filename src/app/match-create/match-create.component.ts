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

  pickDateOfMatch(event) {
    debugger;
    this.freeTeams = [];
    this.freeReferees = [];
    if(event.value != null) {
      this.matchService.getFreeTeamsAndReferees(event.value).subscribe(data => {
        debugger;
        this.freeReferees.push(new Referee());
        data.referees.forEach(referee => this.freeReferees.push(referee));
        data.teams.forEach(team => this.freeTeams.push(team));
      });
    }
  }

  selectReferee(event, matchFunction) {
    this.matchFunctions.set(matchFunction, event);
  }

  selectTeam(event, isGuest: boolean) {
    this.selectedTeams.set(isGuest, event);
  }

  constructor(private matchService: MatchService,
              private router: Router) { }

  ngOnInit(): void {
    this.matchService.getAllFunctions().subscribe(data => data.forEach(matchFunction => this.matchFunctions.set(matchFunction, null)),
        () => {});
  }

  createMatch() {
    debugger;
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
