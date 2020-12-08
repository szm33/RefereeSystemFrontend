import {Referee} from './referee';
import {Team} from './team';

export class Match {

    dateOfMatch: any;
    isClicked: boolean = false;
    description: String;
    referees: Referee[] = [];
    homeTeam: Team;
    awayTeam: Team;
    id: number;
    version: String;
    homeTeamId: number;
    awayTeamId: number;
    timeOfMatch: String;
}
