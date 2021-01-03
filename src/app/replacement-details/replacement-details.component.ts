import { Component, OnInit } from '@angular/core';
import {MatchService} from '../_services/match.service';
import {Match} from '../model/match';
import {Referee} from '../model/referee';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-replacement-details',
  templateUrl: './replacement-details.component.html',
  styleUrls: ['./replacement-details.component.css']
})
export class ReplacementDetailsComponent implements OnInit {

  replaceInformationsDetails: ReplaceInformationsDetails[] = [];

  constructor(private matchService: MatchService,
              private router: ActivatedRoute) { }

  ngOnInit(): void {
    debugger;
    this.matchService.getMatchReplaceInformations(this.router.snapshot.params['id']).subscribe(
        details => this.replaceInformationsDetails = details
    , () => {});
  }

  confrimReplacement(details: ReplaceInformationsDetails, candidateId: number): void {
    this.matchService.confirmReplacement(details, candidateId).subscribe();
  }

}
export class ReplaceInformationsDetails {

  id: number;
  refereeName: String;
  refereesForReplacement: RefereeForReplacement[];
  version: String;
}
export interface RefereeForReplacement {
  id: number;
  name: String;
  arrivalTime: number;
}
