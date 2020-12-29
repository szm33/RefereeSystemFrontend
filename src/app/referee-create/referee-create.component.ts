import { Component } from '@angular/core';
import {Referee} from '../model/referee';
import {RefereeService} from '../_services/referee.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-referee-create',
  templateUrl: './referee-create.component.html',
  styleUrls: ['./referee-create.component.css']
})
export class RefereeCreateComponent {

  constructor(private refereeService: RefereeService,
              private router: Router) { }

  addReferee(referee: Referee) {
    this.refereeService.addReferee(referee).subscribe(() => this.router.navigateByUrl('/login', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/referee'])
    }),
        () => {});
  }

}
