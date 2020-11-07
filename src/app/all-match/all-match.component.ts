import { Component, OnInit } from '@angular/core';
import {MatchService} from '../_services/match.service';
import {Match} from '../model/match';

@Component({
  selector: 'app-all-match',
  templateUrl: './all-match.component.html',
  styleUrls: ['./all-match.component.css']
})
export class AllMatchComponent implements OnInit {

  matches: Match[];

  constructor(private matchService: MatchService) { }


  ngOnInit(): void {
    this.matchService.getAllMatchers().subscribe(
        data => {this.matches = data;},
        () => {} );
  }

}
