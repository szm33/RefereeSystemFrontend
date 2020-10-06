import { Component, OnInit } from '@angular/core';
import {TeamService} from '../_services/team.service';
import {Team} from '../model/team';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teams: Team[];

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.teamService.getAllTeams()
        .subscribe(data => this.teams = data);
  }
}
