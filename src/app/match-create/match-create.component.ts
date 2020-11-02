import {Component, OnInit, ViewChild} from '@angular/core';
import {Match} from '../model/match';
import {MatchService} from '../_services/match.service';
import {Referee} from '../model/referee';
import {Team} from '../model/team';
import {MatchFunction} from '../model/matchFunction';

@Component({
  selector: 'app-match-create',
  templateUrl: './match-create.component.html',
  styleUrls: ['./match-create.component.css']
})
export class MatchCreateComponent implements OnInit {

  match: Match = new Match();
  freeReferees: Referee[];
  freeTeams: Team[];
  matchFunctions: Map<MatchFunction, Referee> = new Map();
  selectedTeams: Map<boolean, Team> = new Map().set(false, null).set(true, null);

  pickDateOfMatch(event) {
    debugger;
    if(event.value == null) {
      this.freeTeams = [];
      this.freeReferees = [];
    }
    else {
      this.matchService.getFreeTeamsAndReferees(event.value).subscribe(data => {
        this.freeReferees = data.referees;
        this.freeTeams = data.teams;
      });
    }
  }

  selectReferee(event, matchFunction) {
    this.matchFunctions.set(matchFunction, event);
  }

  selectTeam(event, isGuest: boolean) {
    this.selectedTeams.set(isGuest, event);
  }

  constructor(private matchService: MatchService) { }

  ngOnInit(): void {
    this.matchService.getAllFunctions().subscribe(data => data.forEach(matchFunction => this.matchFunctions.set(matchFunction, null)),
        () => {});
  }

  createMatch() {
    this.selectedTeams.forEach((team, isGuest) => {
      if (isGuest) {
        this.match.awayTeamId = team.id;
      }
      else {
        this.match.homeTeamId = team.id;
      }
    });
    this.matchFunctions.forEach((referee, matchFunction) => {
      referee.function = matchFunction.functionName;
      this.match.referees.push(referee)
    });
    debugger;
    this.matchService.createMatch(this.match).subscribe();
  }

}
