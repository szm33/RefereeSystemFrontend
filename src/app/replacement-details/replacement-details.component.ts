import { Component, OnInit } from '@angular/core';
import {MatchService} from '../_services/match.service';
import {Match} from '../model/match';
import {Referee} from '../model/referee';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../_services/auth.service';

@Component({
  selector: 'app-replacement-details',
  templateUrl: './replacement-details.component.html',
  styleUrls: ['./replacement-details.component.css']
})
export class ReplacementDetailsComponent implements OnInit {

  replaceInformationsDetails: ReplaceInformationsDetails[] = [];

  constructor(private matchService: MatchService,
              private router: ActivatedRoute,
              private authService: AuthService,
              private navigationRouter: Router) { }

  ngOnInit(): void {
    this.matchService.getMatchReplaceInformations(this.router.snapshot.params['id']).subscribe(
        details => this.replaceInformationsDetails = details
    , () => {});
  }

  confirmReplacement(details: ReplaceInformationsDetails, candidateId: number): void {
    this.matchService.confirmReplacement(details, candidateId).subscribe(() => this.navigationRouter.navigateByUrl('/login', {skipLocationChange: true}).then(() => {
          this.navigationRouter.navigate(['/replace'])
        }),
        () => {});
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
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
