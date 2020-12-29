import { Component, OnInit } from '@angular/core';
import {AccountService} from '../_services/account.service';
import {Account} from '../model/account';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  account: Account = new Account();
  password: any = {};

  constructor(private accountService: AccountService,
              private router: Router,) { }

  ngOnInit(): void {
    this.accountService.getMyAccount()
        .subscribe(data => {this.account = data;},
            () => {}
        );
  }

  changePassword(): void {
    this.accountService.changePassword(this.password)
        .subscribe(() => this.router.navigateByUrl('/login', {skipLocationChange: true}).then(() => {
                this.router.navigate(['/account'])
            }),
            () => {});

  }

  modifyMyAccount(): void {
    debugger;
    this.accountService.modifyMyAccount(this.account)
        .subscribe(() =>
          this.router.navigateByUrl('/login', {skipLocationChange: true}).then(() => {
                this.router.navigate(['/account'])
          }),
            () => {});
  }
}


