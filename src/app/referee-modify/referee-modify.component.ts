import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {RefereeService} from '../_services/referee.service';
import {Referee} from '../model/referee';
import {License} from '../model/license';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-referee-modify',
  templateUrl: './referee-modify.component.html',
  styleUrls: ['./referee-modify.component.css']
})
export class RefereeModifyComponent implements OnInit, OnChanges {

  @Input()
  refereeDetails : Referee;
  referee : Referee;
  licenses: License;
  isChecked: boolean = false;

  constructor(private refereeService : RefereeService) { }

  ngOnInit(): void {
    this.refereeService.getRefereesLicenses()
        .subscribe(data => this.licenses = data);
  }

  modifyReferee() {
    this.refereeService.modifyReferee(this.referee)
        .subscribe(() => {this.isChecked = false;
        this.refereeDetails.license = this.referee.license;
        this.refereeDetails.name = this.referee.name;
        this.refereeDetails.surname = this.referee.surname;
        this.refereeDetails.email = this.referee.email;
        window.alert("modify successfully")},
            () => {});
  }

  modify() {
    debugger;

  }

  ngOnChanges(changes: SimpleChanges): void {
    debugger;
    if ('refereeDetails') {
      this.referee =  Object.assign({}, this.refereeDetails);
    }
  }
}
