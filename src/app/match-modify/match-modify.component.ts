import {Component, OnInit} from '@angular/core';
import {Referee} from '../model/referee';
import {MatchModify} from '../model/matchModify';
import {MatchService} from '../_services/match.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
    selector: 'app-match-modify',
    templateUrl: './match-modify.component.html',
    styleUrls: ['./match-modify.component.css']
})
export class MatchModifyComponent implements OnInit {

    match: MatchModify = new MatchModify();
    freeReferees: Referee[] = [];
    matchFunctions: Map<String, Referee> = new Map();
    date: any;
    blankReferee: Referee = new Referee();
    c:any;
    // matchFunctionsList: String[];

    constructor(private matchService: MatchService,
                private router: ActivatedRoute,
                private routerUrl: Router) {
    }

    ngOnInit(): void {
        this.blankReferee.name = 'empty';
        this.matchService.getMatch(this.router.snapshot.params['id'])
            .subscribe(data => {
                    console.log(data);
                    this.match = data;
                    this.match.functions.forEach(matchFunction => this.matchFunctions.set(matchFunction, null));
                    this.match.referees.forEach(referee => this.matchFunctions.set(referee.function, referee));
                    this.match.timeOfMatch = data.timeOfMatch;
                    // this.match.timeOfMatch = this.match.timeOfMatch[0] + ':' + this.match.timeOfMatch[1];
                    this.matchService.getFreeTeamsAndReferees(this.match.dateOfMatch).subscribe(data => {
                        this.freeReferees.push(new Referee());
                        this.freeReferees.push(this.blankReferee);
                        this.match.referees.forEach(referee => this.freeReferees.push(referee));
                        data.referees.forEach(referee => this.freeReferees.push(referee));
                    });
                    // console.log(this.date);
                },
                () => {
                });
    }

    pickDateOfMatch(event) {
        var date = [];
        date.push(event.value.toArray()[0]);
        date.push(event.value.toArray()[1] + 1);
        date.push(event.value.toArray()[2]);
        if(event.value != null && (event.value.toArray()[0] != this.match.dateOfMatch[0] || event.value.toArray()[1] + 1 != this.match.dateOfMatch[1] || event.value.toArray()[2] != this.match.dateOfMatch[2])) {
            this.matchService.getFreeTeamsAndReferees(date).subscribe(data => {
                if(data.teams.filter(team => team.id == this.match.homeTeam.id || team.id == this.match.awayTeam.id).length == 2) {
                    this.freeReferees = [];
                    this.freeReferees.push(new Referee());
                    this.freeReferees.push(this.blankReferee);
                    data.referees.forEach(referee => this.freeReferees.push(referee));
                    this.date = event.value;
                    this.matchFunctions.forEach((referee,matchFunction) => this.matchFunctions.set(matchFunction,null));
                }
                else {
                    window.alert("Teams are unavailable in this term");
                }
            },
                () =>{});
        }
        else if (this.date != null ) {
            this.matchService.getFreeTeamsAndReferees(this.match.dateOfMatch).subscribe(data => {
                this.freeReferees = [];
                this.freeReferees.push(new Referee());
                this.freeReferees.push(this.blankReferee);
                this.match.referees.forEach(referee => this.freeReferees.push(referee));
                data.referees.forEach(referee => this.freeReferees.push(referee));
                this.date = null;
                this.matchFunctions.forEach((referee,matchFunction) => this.matchFunctions.set(matchFunction,null));
            });
        }
        else {
            this.date = null;
        }
    }

    selectReferee(event, matchFunction) {
        debugger;
        this.matchFunctions.set(matchFunction, event.value);
    }

    getRefereeName(matchFunction: String): String {
        const matchReferee = this.match.referees.find(referee => referee.function == matchFunction);
        if (matchReferee != null) {
            return matchReferee.name + ' ' + matchReferee.surname;
        }
        else {
            return null;
        }
    }

    modifyMatch() {
        console.log(this.match.timeOfMatch);
        debugger;
        if (this.date != null) {
            this.match.dateOfMatch = [];
            this.match.dateOfMatch.push(this.date.toArray()[0]);
            this.match.dateOfMatch.push(this.date.toArray()[1] + 1);
            this.match.dateOfMatch.push(this.date.toArray()[2]);
        }
        this.match.referees.forEach(referee => {
            if(!this.matchFunctions.get(referee.function).name) {
                this.matchFunctions.set(referee.function, referee);
            }
        });
        this.match.referees = [];
        this.matchFunctions.forEach((referee, matchFunction) => {
            if(referee != null && referee.id ) {
                referee.function = matchFunction;
                this.match.referees.push(referee);
            }
        });
        this.matchService.editMatch(this.match).subscribe(() => this.routerUrl.navigate(['match']),
            () => window.alert("failed create"));
    }
}

