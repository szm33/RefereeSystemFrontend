import { Component, OnInit } from '@angular/core';
import {AccountService} from '../_services/account.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  account: any = {};
  password: any = {};

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.getMyAccount()
        .subscribe(data => this.account = data
        );
    console.log(this.account);
  }

  changePassword(): void {
    this.accountService.changePassword(this.password)
        .subscribe();
    window.location.reload();

  }

  modifyMyAccount(): void {
    this.accountService.modifyMyAccount(this.account)
        .subscribe();
    window.location.reload();
  }
}


