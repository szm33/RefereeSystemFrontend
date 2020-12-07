import {Component, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RefereeService} from '../_services/referee.service';
import {Referee} from '../model/referee';
import {AuthService} from '../_services/auth.service';
import {FormControl, Validators} from '@angular/forms';


@Component({
    selector: 'app-referee-details',
    templateUrl: './referee-details.component.html',
    styleUrls: ['./referee-details.component.css']
})
export class RefereeDetailsComponent implements OnInit {

    referee: Referee;
    formControl = new FormControl('', [
        Validators.required,
    ]);

    constructor(private route: ActivatedRoute,
                private refereeService: RefereeService,
                private authService: AuthService) {
    }

    ngOnInit(): void {
        this.refereeService.getReferee(this.route.snapshot.params['id'])
            .subscribe(data => {
                this.referee = data;
                console.log(data);
                console.log(this.referee);
            });
    }

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }

    isAdmin() {
        return this.authService.isAdmin();
    }
}
