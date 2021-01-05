import { Component, OnInit } from '@angular/core';
import {AccountService} from '../_services/account.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  isValid: boolean = false;
  password: Password = new Password();

  constructor(private accountService: AccountService,
              private route : ActivatedRoute,
              private navigationRouter: Router) { }

  ngOnInit(): void {
    this.password.link = this.route.snapshot.params['link'];
    this.accountService.validateLink(this.password.link).subscribe(
        data => this.isValid = data.value === 'true'
    );
  }

  resetPassword(): void {
    this.accountService.resetPassword(this.password).subscribe(
        () => this.navigationRouter.navigate(['/login']),
        () => {});
  }

}

class Password {
  password: String;
  confirmedPassword: String;
  link: String;
}
