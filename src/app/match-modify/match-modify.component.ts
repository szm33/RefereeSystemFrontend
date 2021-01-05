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

    now: Date = new Date();
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
        // this.freeReferees = [];
        // this.match.dateOfMatch = null;
        // this.match.homeTeam = null;
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
                // if (this.match.dateOfMatch.getTime() == date.getTime() || data.teams.filter(team => team.id == this.match.homeTeam.id || team.id == this.match.awayTeam.id).length == 2) {
                    this.freeReferees = data.referees;
                    this.match.referees.forEach(referee => {
                        if (!this.freeReferees.find(freeReferee => freeReferee.id == referee.id)) {
                            referee.id = null;
                        }
                    });
                // } else {
                //     window.alert('Teams are unavailable in this term');
                // }
            });
        }
        this.match.dateOfMatch = event.value;
        // var date = [];
        // date.push(event.value.toArray()[0]);
        // date.push(event.value.toArray()[1] + 1);
        // date.push(event.value.toArray()[2]);
        // if(event.value != null && (event.value.toArray()[0] != this.match.dateOfMatch[0] || event.value.toArray()[1] + 1 != this.match.dateOfMatch[1] || event.value.toArray()[2] != this.match.dateOfMatch[2])) {
        //     this.matchService.getFreeTeamsAndReferees(date).subscribe(data => {
        //         if(data.teams.filter(team => team.id == this.match.homeTeam.id || team.id == this.match.awayTeam.id).length == 2) {
        //             this.freeReferees = [];
        //             this.freeReferees.push(new Referee());
        //             this.freeReferees.push(this.blankReferee);
        //             data.referees.forEach(referee => this.freeReferees.push(referee));
        //             this.date = event.value;
        //             this.matchFunctions.forEach((referee,matchFunction) => this.matchFunctions.set(matchFunction,null));
        //         }
        //         else {
        //             window.alert("Teams are unavailable in this term");
        //         }
        //     },
        //         () =>{});
        // }
        // else if (this.date != null ) {
        //     this.matchService.getFreeTeamsAndReferees(this.match.dateOfMatch).subscribe(data => {
        //         this.freeReferees = [];
        //         this.freeReferees.push(new Referee());
        //         this.freeReferees.push(this.blankReferee);
        //         this.match.referees.forEach(referee => this.freeReferees.push(referee));
        //         data.referees.forEach(referee => this.freeReferees.push(referee));
        //         this.date = null;
        //         this.matchFunctions.forEach((referee,matchFunction) => this.matchFunctions.set(matchFunction,null));
        //     });
        // }
        // else {
        //     this.date = null;
        // }
    }

    // selectReferee(event, refe) {
    //     // matchReferee.name = event.name;
    //     // this.matchFunctions.set(matchFunction, event.value);
    // }
    //
    // selectFunction(event ,c) {
    //
    // }

    // getRefereeName(matchFunction: String): String {
    //     const matchReferee = this.match.referees.find(referee => referee.function == matchFunction);
    //     if (matchReferee != null) {
    //         return matchReferee.name + ' ' + matchReferee.surname;
    //     }
    //     else {
    //         return null;
    //     }
    // }

    modifyMatch() {
        console.log(this.match.timeOfMatch);
        this.match.dateOfMatch.setDate(this.match.dateOfMatch.getDate() + 1);
        this.match.referees = this.match.referees.filter(referee => referee.id);
        //     if (this.date != null) {
        //         this.match.dateOfMatch = [];
        //         this.match.dateOfMatch.push(this.date.toArray()[0]);
        //         this.match.dateOfMatch.push(this.date.toArray()[1] + 1);
        //         this.match.dateOfMatch.push(this.date.toArray()[2]);
        //     }
        //     this.match.referees.forEach(referee => {
        //         if(!this.matchFunctions.get(referee.function).name) {
        //             this.matchFunctions.set(referee.function, referee);
        //         }
        //     });
        //     this.match.referees = [];
        //     this.matchFunctions.forEach((referee, matchFunction) => {
        //         if(referee != null && referee.id ) {
        //             referee.function = matchFunction;
        //             this.match.referees.push(referee);
        //         }
        //     });
            this.matchService.editMatch(this.match).subscribe(() => this.routerUrl.navigate(['match']),
                () => window.alert("failed create"));
    }
}

