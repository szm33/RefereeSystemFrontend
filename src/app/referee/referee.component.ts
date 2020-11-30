import { Component, OnInit } from '@angular/core';
import {RefereeService} from '../_services/referee.service';
import {Referee} from '../model/referee';
import {AuthService} from '../_services/auth.service';

@Component({
  selector: 'app-referee',
  templateUrl: './referee.component.html',
  styleUrls: ['./referee.component.css']
})
export class RefereeComponent implements OnInit {

  referees: Referee[] =  [];

  constructor(private refereeService: RefereeService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.refereeService.getAllReferee().subscribe(
      data => {
        debugger;
        this.referees = data;
      }
    );
  }

  changeActiveStatus(referee: any): void {
    this.refereeService.changeActiveStatus(referee.id)
        .subscribe(result => {referee.active = !referee.active;},
            () => {}
       );
  }

  isAdmin() {
    return this.authService.isAdmin();
  }
}
