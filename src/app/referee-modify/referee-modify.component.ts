import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {RefereeService} from '../_services/referee.service';

@Component({
  selector: 'app-referee-modify',
  templateUrl: './referee-modify.component.html',
  styleUrls: ['./referee-modify.component.css']
})
export class RefereeModifyComponent implements OnInit, OnChanges {

  @Input()
  refereeDetails : any;
  referee : any;
  licenses = [];

  isChecked : boolean = false;

  constructor(private refereeService : RefereeService) { }

  ngOnInit(): void {
    this.refereeService.getRefereesLicenses()
        .subscribe(data => this.licenses = data);
  }

  modifyReferee() {
    this.refereeService.modifyReferee(this.referee)
        .subscribe(() => {

        });
      window.location.reload();
  }

  ngOnChanges(changes: SimpleChanges): void {
    debugger;
    if ('refereeDetails') {
      this.referee =  Object.assign({}, this.refereeDetails);
    }
  }
}
