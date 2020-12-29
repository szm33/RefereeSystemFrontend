import {Component, Inject, OnInit} from '@angular/core';
import {Match} from '../model/match';
import {MatchService} from '../_services/match.service';
import {AuthService} from '../_services/auth.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ArrivalTime} from '../arrival-time-picker/arrival-time-picker.component';
import {ReplacementDialogComponent} from './replacemnet-dialog/replacement-dialog.component';
import {Router} from '@angular/router';

@Component({
    selector: 'app-replacement-match',
    templateUrl: './replacement-match.component.html',
    styleUrls: ['./replacement-match.component.css'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ]
})
export class ReplacementMatchComponent implements OnInit {

    matches: Match[] = [];
    columnsToDisplay = ['homeTeam', 'awayTeam', 'dateOfMatch'];
    pickedMatch: Match | null;

    constructor(private matchService: MatchService,
                private authService: AuthService,
                public dialog: MatDialog,
                private router: Router) {
    }

    sendArrivalTime(arrivalTime: ArrivalTime) {
        this.matchService.sendArrivalTime(arrivalTime).subscribe(() => this.router.navigateByUrl('/login', {skipLocationChange: true}).then(() => {
                this.router.navigate(['/replace'])
            }),
            () => {});
    }

    isAdmin() {
        return this.authService.isAdmin();
    }

    ngOnInit(): void {
        this.matchService.getAllReplaceInformations().subscribe(replaceInformations => {
            replaceInformations.forEach(info => {
                console.log(info);
                info.match.replaceFunction = info.replaceFunction;
                info.match.replaceId = info.id;
                info.match.refereeCandidate = info.refereeCandidate;
            });
            this.matches = replaceInformations.map(info => info.match);
            console.log(this.matches);
        });
    }

    openDialog(replaceId: number): void {
        const dialogRef = this.dialog.open(ReplacementDialogComponent, {
            width: '250px',
            data: {id: replaceId, arrivalTime: 1}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            console.log(result);
            if (result) {
                this.sendArrivalTime(result);
            }
        });
    }

    resign(replaceId: number) {
        console.log('Resing');
        console.log(replaceId);
    }

}

export class MatchToReplaceInformations {

    id: number;
    match: Match;
    refereeCandidate: boolean;
    replaceFunction: String;
}

