import { Component } from '@angular/core';
import {Referee} from '../model/referee';
import {RefereeService} from '../_services/referee.service';

@Component({
  selector: 'app-referee-create',
  templateUrl: './referee-create.component.html',
  styleUrls: ['./referee-create.component.css']
})
export class RefereeCreateComponent {

  constructor(private refereeService: RefereeService) { }

  addReferee(referee: Referee) {
    this.refereeService.addReferee(referee).subscribe();
  }

}
