import {Component, Input, OnInit} from '@angular/core';
import {MatchService} from '../_services/match.service';
import {Match} from '../model/match';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  @Input()
  matches: Match[];
  @Input()
  isMyMatches: boolean = false;


  constructor(private matchService: MatchService) { }

  ngOnInit(): void {
  }

  show(match: Match): void {
    match.isClicked = !match.isClicked;
  }

  replaceReferee(matchId: number) {
    this.matchService.replaceReferee(matchId).subscribe(() => {} , () => {});
  }

}
