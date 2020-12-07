import {Component, Input, OnInit} from '@angular/core';
import {TeamService} from '../_services/team.service';
import {Team} from '../model/team';
import {League} from '../model/league';
import {ActivatedRoute} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.css']
})
export class TeamEditComponent implements OnInit {

  teamToEdit : Team = new Team();

  constructor(private teamService: TeamService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.teamService.getTeam(this.route.snapshot.params["id"]).subscribe(
        team => this.teamToEdit = team);
  }

  editTeam(team: Team) {
    this.teamService.editTeam(team).subscribe();
  }

}
