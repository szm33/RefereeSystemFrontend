import { Component, OnInit } from '@angular/core';
import {MatchService} from '../_services/match.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Match} from '../model/match';

@Component({
  selector: 'app-arrival-time-picker',
  templateUrl: './arrival-time-picker.component.html',
  styleUrls: ['./arrival-time-picker.component.css']
})
export class ArrivalTimePickerComponent implements OnInit {

  // matchInfo: MatchToReplaceInformations = new MatchToReplaceInformations();
  arrivalTime: ArrivalTime = new ArrivalTime();

  constructor(private matchService: MatchService,
              private router: ActivatedRoute) { }

  ngOnInit(): void {
    // this.matchService.getReplaceInformations(this.router.snapshot.params['id'])
    //     .subscribe(data => { this.matchInfo.description = data.description;
    //     this.matchInfo.dateOfMatch = new Date(data.dateOfMatch[0],data.dateOfMatch[1] - 1,data.dateOfMatch[2],data.dateOfMatch[3],data.dateOfMatch[4]);
    //
    // }, () => {})
  }

  sendArrivalTime(): void {
    this.arrivalTime.id = this.router.snapshot.params['id'];
    console.log(this.arrivalTime);
    this.matchService.sendArrivalTime(this.arrivalTime).subscribe(() => {window.alert("successfully")} ,
        () => {window.alert("failed")});
  }

}



export class ArrivalTime {

  id: number;
  arrivalTime: number;
}
