import {Referee} from './referee';
import {Team} from './team';

export class Match {

    dateOfMatch: Date;
    isClicked: boolean = false;
    description: String;
    homeScore: number;
    awayScore: number;
    referees: Referee[] = [];
    teams: Team[] = [];
    id: number;
    version: String;
    homeTeamId: number;
    awayTeamId: number;
}
