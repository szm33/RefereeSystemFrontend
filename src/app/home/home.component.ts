import { Component, OnInit } from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {Match} from '../model/match';
import {MatchService} from '../_services/match.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  content: string;
  matches: Match[];


  constructor(private matchService: MatchService,
              private authService: AuthService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this._snackBar.open("Testujemy", null,{duration: 3 * 1000});
  }

  getMyMatches(): void {
    this.matchService.getMyMatches()
        .subscribe(data => this.matches = data,
            () => {});
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

}
