import { Component, OnInit } from '@angular/core';
import {RefereeService} from '../_services/referee.service';
import {Referee} from '../model/referee';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-referee-edit',
  templateUrl: './referee-edit.component.html',
  styleUrls: ['./referee-edit.component.css']
})
export class RefereeEditComponent implements OnInit {

  refereeToEdit: Referee;

  constructor(private refereeService: RefereeService,
              private router: ActivatedRoute,
              private navigationRouter: Router) { }

  ngOnInit(): void {
    this.refereeService.getReferee(this.router.snapshot.params['id']).subscribe( referee => this.refereeToEdit = referee);
  }

  editReferee(referee: Referee) {
    this.refereeService.modifyReferee(referee).subscribe(
        () => this.navigationRouter.navigate(['/referee']),
        () => {});
  }
}
