import {Referee} from './referee';
import {Team} from './team';

export class Match {

    dateOfMatch: Date;
    isClicked: boolean = false;
    description: String;
    referees: Referee[] = [];
    homeTeam: Team;
    awayTeam: Team;
    id: number;
    version: String;
    timeOfMatch: String;
}
