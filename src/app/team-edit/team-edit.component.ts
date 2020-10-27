import {Component, Input, OnInit} from '@angular/core';
import {TeamService} from '../_services/team.service';
import {Team} from '../model/team';
import {League} from '../model/league';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.css']
})
export class TeamEditComponent implements OnInit {

  team : Team;
  leagues: League[];

  constructor(private teamService: TeamService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.teamService.getTeam(this.route.snapshot.params["id"]).subscribe(
        data => this.team = data);
    this.teamService.getAllLeagues().subscribe(
        data => {
          this.leagues = data;
          }, () => {} );
  }

  editTeam() {
    this.teamService.editTeam(this.team).subscribe();
  }

}
