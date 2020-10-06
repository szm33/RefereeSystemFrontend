import {Component, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RefereeService} from '../_services/referee.service';
import {Referee} from '../model/referee';


@Component({
  selector: 'app-referee-details',
  templateUrl: './referee-details.component.html',
  styleUrls: ['./referee-details.component.css']
})
export class RefereeDetailsComponent implements OnInit {

  referee: Referee;

  constructor(private route : ActivatedRoute,
              private refereeService : RefereeService) { }

  ngOnInit(): void {
      this.refereeService.getReferee(this.route.snapshot.params["id"])
          .subscribe(data => this.referee = data);
  }

  modify(event: Referee) {
    debugger;
     this.referee = event;
  }

}
