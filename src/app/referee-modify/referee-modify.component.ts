import {Component, Input, OnInit} from '@angular/core';
import {RefereeService} from '../_services/referee.service';

@Component({
  selector: 'app-referee-modify',
  templateUrl: './referee-modify.component.html',
  styleUrls: ['./referee-modify.component.css']
})
export class RefereeModifyComponent implements OnInit {

  @Input()
  referee : any;
  licenses = [];

  isChecked : boolean = false;

  constructor(private refereeService : RefereeService) { }

  ngOnInit(): void {
    this.refereeService.getRefereesLicenses()
        .subscribe(data => this.licenses = data);
    console.log(this.licenses);
  }

  modifyReferee() {
    this.refereeService.modifyReferee(this.referee).subscribe();
  }
}
