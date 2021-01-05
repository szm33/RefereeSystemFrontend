import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatchService} from '../_services/match.service';
import {Match} from '../model/match';
import {AuthService} from '../_services/auth.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class MatchComponent{

  @Input()
  matches: Match[];
  columnsToDisplay =  ['homeTeam','awayTeam','dateOfMatch'];
  pickedMatch: Match | null;
  @Input()
  isMyMatches: boolean = false;

  constructor(private matchService: MatchService,
              private authService: AuthService,
              private router: Router) { }

  show(match: Match): void {
    match.isClicked = !match.isClicked;
  }

  replaceReferee(matchId: number) {
    this.matchService.replaceReferee(matchId).subscribe(() =>
      this.router.navigateByUrl('/login', {skipLocationChange: true}).then(() => {
        this.router.navigate(['/replace'])}),
        () =>{})
  }

  isAdmin() {
    return this.authService.isAdmin();
  }
}
