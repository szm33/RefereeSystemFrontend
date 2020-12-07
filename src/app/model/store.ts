import {League} from './league';
import {License} from './license';
import {MatchFunction} from './matchFunction';

export class Store {

    leagues: League[] = [];
    licenses: License[] = [];
    matchFunctions: MatchFunction[] = [];
}
