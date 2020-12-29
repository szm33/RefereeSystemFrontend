import { Component} from '@angular/core';
import {Team} from '../model/team';
import {TeamService} from '../_services/team.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.css']
})
export class TeamCreateComponent {

  constructor(private teamService: TeamService,
              private router: Router) { }

  addTeam(team: Team) {
    this.teamService.addTeam(team).subscribe(() => this.router.navigateByUrl('/login', {skipLocationChange: true}).then(() => {
          this.router.navigate(['/team'])
        }),
        () => {});
  }

}
