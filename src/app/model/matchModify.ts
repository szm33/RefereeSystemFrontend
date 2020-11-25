import {Team} from './team';
import {MatchFunction} from './matchFunction';
import {Referee} from './referee';

export class MatchModify {

    id: number;
    dateOfMatch: any;
    homeTeam: Team = new Team();
    awayTeam: Team = new Team();
    // refereesFunction: Map<MatchFunction, Referee>;
    referees: Referee[];
    functions: String[];
    description: String;
    version: String;
    timeOfMatch: any;
}
