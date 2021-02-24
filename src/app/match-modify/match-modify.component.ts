import {Component, OnInit} from '@angular/core';
import {Referee} from '../model/referee';
import {MatchService} from '../_services/match.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Match} from '../model/match';
import {Team} from '../model/team';
import {MatchFunction} from '../model/matchFunction';
import {DictionaryService} from '../_services/dictionary.service';
import {FormControl} from '@angular/forms';


@Component({
    selector: 'app-match-modify',
    templateUrl: './match-modify.component.html',
    styleUrls: ['./match-modify.component.css']
})
export class MatchModifyComponent implements OnInit {

    match: Match = new Match();
    freeReferees: Referee[] = [];
    matchFunctions: MatchFunction[] = [];
    initialReferees: Referee[] = [];
    initialDate: Date;

    constructor(private matchService: MatchService,
                private router: ActivatedRoute,
                private routerUrl: Router,
                private dictionaryService: DictionaryService) {
    }


    addReferee() {
        if (this.match.referees.length < this.matchFunctions.length) {
            this.match.referees.push(new Referee());
        }
    }

    removeReferee(referee: Referee) {
        this.match.referees = this.match.referees.filter(matchReferee => matchReferee != referee);
    }

    ngOnInit(): void {
        this.matchService.getMatch(this.router.snapshot.params['id'])
            .subscribe(data => {
                    console.log(data);
                    this.match = data.match;
                    this.match.dateOfMatch = new Date(this.match.dateOfMatch);
                    this.initialDate = this.match.dateOfMatch;
                    this.freeReferees = data.freeReferees;
                    this.match.referees.forEach(referee => {
                        const copyOfReferee = JSON.parse(JSON.stringify(referee));
                        this.initialReferees.push(copyOfReferee);
                        this.freeReferees.push(copyOfReferee);
                    });
                },
                () => {
                });
        if (this.dictionaryService.store.matchFunctions.length == 0) {
            this.dictionaryService.getDictionariesObservable().subscribe(dictionaries => this.matchFunctions = dictionaries.matchFunctions);
        } else {
            this.matchFunctions = this.dictionaryService.store.matchFunctions;
        }
    }

    pickDateOfMatch(event) {
        if (event.value != null) {
            const date = new Date(event.value);
            date.setDate(date.getDate() + 1);
            this.matchService.getFreeTeamsAndReferees(date).subscribe(data => {
                this.freeReferees = data.referees;
                if (this.initialDate.getTime() == event.value.getTime()) {
                    this.initialReferees.forEach(referee => {
                        if (!this.freeReferees.find(freeReferee => freeReferee.id == referee.id)) {
                            this.freeReferees.push(referee);
                        }
                    });
                }
                else if (data.teams.filter(team => team.id == this.match.homeTeam.id || team.id == this.match.awayTeam.id).length != 2) {
                    window.alert('Teams are unavailable in this term');
                    return;
                }
                    this.freeReferees = data.referees;
                    this.match.referees.forEach(referee => {
                        if (!this.freeReferees.find(freeReferee => freeReferee.id == referee.id)) {
                            referee.id = null;
                        }
                    });
            });
        }
        this.match.dateOfMatch = event.value;
    }

    modifyMatch() {
        console.log(this.match.timeOfMatch);
        this.match.dateOfMatch.setDate(this.match.dateOfMatch.getDate() + 1);
        this.match.referees = this.match.referees.filter(referee => referee.id);
            this.matchService.editMatch(this.match).subscribe(() => this.routerUrl.navigate(['match']),
                () =>   this.match.dateOfMatch.setDate(this.match.dateOfMatch.getDate() - 1));
    }
}

