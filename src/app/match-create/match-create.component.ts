import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Match} from '../model/match';
import {MatchService} from '../_services/match.service';
import {Referee} from '../model/referee';
import {Team} from '../model/team';
import {MatchFunction} from '../model/matchFunction';
import {Router} from '@angular/router';
import {DictionaryService} from '../_services/dictionary.service';

@Component({
    selector: 'app-match-create',
    templateUrl: './match-create.component.html',
    styleUrls: ['./match-create.component.css']
})
export class MatchCreateComponent implements OnInit {

    match: Match = new Match();
    freeReferees: Referee[] = [];
    freeTeams: Team[] = [];
    matchFunctions: MatchFunction[] = [];
//zrobic jak w modyfikacji ze sprawdza czy team/referee jest po zmianie jesli tak zostawia
    pickDateOfMatch(event) {
        debugger;
        this.freeTeams = [];
        this.freeReferees = [];
        this.match.dateOfMatch = null;
        this.match.homeTeam = null;
        this.match.awayTeam = null;
        if (event.value != null) {
            const date = new Date(event.value);
            date.setDate(date.getDate() + 1);
            debugger;
            this.matchService.getFreeTeamsAndReferees(date).subscribe(data => {
                this.match.referees.forEach(referee => referee.id = null);
                data.referees.forEach(referee => this.freeReferees.push(referee));
                data.teams.forEach(team => this.freeTeams.push(team));
                this.match.dateOfMatch = event.value;
            });
        } else {
            this.match.referees = [];
        }
    }

    addReferee() {
        debugger;
        if (this.match.referees.length < this.matchFunctions.length) {
            this.match.referees.push(new Referee());
        }
    }

    removeReferee(referee: Referee) {
        this.match.referees = this.match.referees.filter(matchReferee => matchReferee != referee);
    }

    constructor(private matchService: MatchService,
                private router: Router,
                private dictionaryService: DictionaryService) {
    }

    ngOnInit(): void {
        debugger;
        if (this.dictionaryService.store.matchFunctions.length == 0) {
            this.dictionaryService.getDictionariesObservable().subscribe(dictionaries => this.matchFunctions = dictionaries.matchFunctions);
        } else {
            this.matchFunctions = this.dictionaryService.store.matchFunctions;
        }
    }

    //dodac jeszcze taka sama walidacje na druzyny i sedziow aby sie nie powtarzaly i dac if na przyciska
    areFunctionsValid(): boolean {
        let isValid = true;
        this.matchFunctions.forEach(matchFunction => {
            if (this.match.referees.filter(referee => referee.function && referee.function == matchFunction.functionName).length > 1) {
                isValid = false;
            }
        });
        return isValid;
    }

    createMatch() {
        this.match.dateOfMatch.setDate(this.match.dateOfMatch.getDate() + 1);
        this.match.referees = this.match.referees.filter(referee => referee.id);
        this.matchService.createMatch(this.match).subscribe(data => {
            this.router.navigateByUrl('/login', {skipLocationChange: true}).then(() => {
                this.router.navigate(['/match']);
            });
        }), () => window.alert('failed create');
    }

}
