import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatchService} from '../_services/match.service';
import {ActivatedRoute} from '@angular/router';
import {Match} from '../model/match';

@Component({
  selector: 'app-referee-matches',
  templateUrl: './referee-matches.component.html',
  styleUrls: ['./referee-matches.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RefereeMatchesComponent implements OnInit {

  matches: Match[];

  constructor(private matchService: MatchService,
              private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.matchService.getRefereeMatches(this.router.snapshot.params['id'])
        .subscribe(data => this.matches = data,
            () =>{});
  }

}
