import {Component, Input, OnInit} from '@angular/core';
import {TeamService} from '../_services/team.service';
import {Team} from '../model/team';
import {AuthService} from '../_services/auth.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TeamComponent implements OnInit {

  teams: Team[];
  columnsToDisplay =  ['name','league'];
  pickedTeam: Team | null;

  constructor(private teamService: TeamService,
              private authService : AuthService) { }

  ngOnInit(): void {
    this.teamService.getAllTeams()
        .subscribe(data => this.teams = data);
  }

  isAdmin() {
    return this.authService.isAdmin();
  }
}
