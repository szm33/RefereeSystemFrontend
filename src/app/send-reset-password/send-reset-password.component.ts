import { Component, OnInit } from '@angular/core';
import {AccountService} from '../_services/account.service';

@Component({
  selector: 'app-send-reset-password',
  templateUrl: './send-reset-password.component.html',
  styleUrls: ['./send-reset-password.component.css']
})
export class SendResetPasswordComponent implements OnInit {

  username ='' ;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  send() {
    this.accountService.sendResetLink(this.username).subscribe();
  }

}

interface Username {
  username: String;
}
