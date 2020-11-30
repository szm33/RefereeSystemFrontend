import { Component, OnInit } from '@angular/core';
import {TeamService} from '../_services/team.service';
import {Team} from '../model/team';
import {AuthService} from '../_services/auth.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teams: Team[];

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
