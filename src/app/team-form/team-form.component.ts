import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Team} from '../model/team';
import {League} from '../model/league';
import {FormControl, Validators} from '@angular/forms';
import {TeamService} from '../_services/team.service';
import {ActivatedRoute} from '@angular/router';
import {DictionaryService} from '../_services/dictionary.service';

@Component({
    selector: 'app-team-form',
    templateUrl: './team-form.component.html',
    styleUrls: ['./team-form.component.css']
})
export class TeamFormComponent implements OnInit {

    @Input()
    header: String;
    @Input()
    team: Team = new Team();
    leagues: League[];
    @Output()
    teamEmitter: EventEmitter<Team> = new EventEmitter<Team>();

    constructor(private teamService: TeamService,
                private route: ActivatedRoute,
                private dictionaryService: DictionaryService) {
    }

    ngOnInit(): void {
        if (this.dictionaryService.store.leagues.length == 0) {
            this.dictionaryService.getDictionariesObservable().subscribe(dictionaries => this.leagues = dictionaries.leagues);
        }
        else {
            this.leagues = this.dictionaryService.store.leagues;
        }
    }

    emitData() {
        this.teamEmitter.emit(this.team);
    }

}
