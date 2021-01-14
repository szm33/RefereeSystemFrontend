import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MatchService} from '../_services/match.service';
import {Match} from '../model/match';
import {AuthService} from '../_services/auth.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-match',
    templateUrl: './match.component.html',
    styleUrls: ['./match.component.css'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ]
})
export class MatchComponent implements OnChanges {

    @Input()
    matches: Match[];
    columnsToDisplay = ['homeTeam', 'awayTeam', 'dateOfMatch'];
    pickedMatch: Match | null;
    @Input()
    isMyMatches: boolean = false;

    constructor(private matchService: MatchService,
                private authService: AuthService,
                private router: Router,
                private activeRoute: ActivatedRoute) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.matches.currentValue && this.activeRoute.snapshot.params['id']) {
            this.pickedMatch = changes.matches.currentValue.find(match => match.id == this.activeRoute.snapshot.params['id']);
            if (this.pickedMatch) {
                this.matches = this.matches.filter(match => match.id != this.pickedMatch.id);
                this.matches.unshift(this.pickedMatch);
            }
        }
    }

    isReplaceAvailable(match: Match): boolean {
        return new Date() < new Date(match.dateOfMatch) && match.referees.find(referee => referee.id == this.authService.getId()) != null;
    }

    replaceReferee(matchId: number) {
        this.matchService.replaceReferee(matchId).subscribe(data =>
                this.router.navigateByUrl('/login', {skipLocationChange: true}).then(() => {
                    this.router.navigate(['/replace/' + data]);
                }),
            () => {
            });
    }

    isAdmin() {
        return this.authService.isAdmin();
    }
}
