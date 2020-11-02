import { Component, OnInit } from '@angular/core';
import {MatchService} from '../_services/match.service';
import {Match} from '../model/match';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  matches: Match[];


  constructor(private matchService: MatchService) { }

  ngOnInit(): void {
    this.matchService.getAllMatchers().subscribe(
        data => {this.matches = data;
        debugger;
    console.log(this.matches);},
        () => {} );
    console.log(this.matches);
  }

  show(match: Match): void {
    match.isClicked = !match.isClicked;
  }

}
