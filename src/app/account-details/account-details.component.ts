import { Component, OnInit } from '@angular/core';
import {AccountService} from '../_services/account.service';
import {Account} from '../model/account';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  account: Account = new Account();
  password: any = {};

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.getMyAccount()
        .subscribe(data => {this.account = data;},
            () => {}
        );
  }

  changePassword(): void {
    this.accountService.changePassword(this.password)
        .subscribe(() => {this.password = {};
        window.alert("password change successfully");},
            () => {});

  }

  modifyMyAccount(): void {
    this.accountService.modifyMyAccount(this.account)
        .subscribe(() => window.alert("modify successfully"),
            () => {});
  }
}


