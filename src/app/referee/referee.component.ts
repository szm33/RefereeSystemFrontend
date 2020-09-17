import { Component, OnInit } from '@angular/core';
import {RefereeService} from '../_services/referee.service';

@Component({
  selector: 'app-referee',
  templateUrl: './referee.component.html',
  styleUrls: ['./referee.component.css']
})
export class RefereeComponent implements OnInit {

  referees =  [];

  constructor(private refereeService: RefereeService) { }

  ngOnInit(): void {
    this.refereeService.getAllReferee().subscribe(
      data => {
        debugger;
        this.referees = data;
      }
    );
  }

}
