import { Component, OnInit } from '@angular/core';
import {RefereeService} from '../_services/referee.service';
import {Referee} from '../model/referee';
import {AuthService} from '../_services/auth.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-referee',
  templateUrl: './referee.component.html',
  styleUrls: ['./referee.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class RefereeComponent implements OnInit {

  referees: Referee[] =  [];
  columnsToDisplay =  ['name','surname'];
  pickedReferee: Referee | null;

  constructor(private refereeService: RefereeService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.refereeService.getAllReferee().subscribe(
      data => {
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
