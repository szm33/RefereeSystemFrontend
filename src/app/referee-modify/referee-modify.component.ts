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
  @Output() refereeDet: EventEmitter<Referee> = new EventEmitter();
  referee : Referee;
  licenses: License;
  //
  // ccc: Subject<boolean> = new BehaviorSubject(false);
  // isCheckedd : Observable<boolean> =  this.ccc.asObservable();
  isChecked: boolean = false;

  constructor(private refereeService : RefereeService) { }

  ngOnInit(): void {
    this.refereeService.getRefereesLicenses()
        .subscribe(data => this.licenses = data);
  }

  modifyReferee() {
    this.refereeService.modifyReferee(this.referee)
        .subscribe(() => {
        });
    this.refereeDet.emit(this.referee);
    this.isChecked = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    debugger;
    if ('refereeDetails') {
      this.referee =  Object.assign({}, this.refereeDetails);
    }
    if ('isChecked'){
      console.log("cos tam");
    }
  }
}
