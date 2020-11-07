import { Component, OnInit } from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {Match} from '../model/match';
import {MatchService} from '../_services/match.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  content: string;
  matches: Match[];


  constructor(private matchService: MatchService) { }

  ngOnInit(): void {
  }

  getMyMatches(): void {
    this.matchService.getMyMatches()
        .subscribe(data => this.matches = data,
            () => {});
  }

}
