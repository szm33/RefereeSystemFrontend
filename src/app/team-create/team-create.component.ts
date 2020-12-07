import { Component} from '@angular/core';
import {Team} from '../model/team';
import {TeamService} from '../_services/team.service';

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.css']
})
export class TeamCreateComponent {

  constructor(private teamService: TeamService) { }

  addTeam(team: Team) {
    this.teamService.addTeam(team).subscribe();
  }

}
