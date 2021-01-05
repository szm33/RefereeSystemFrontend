import { Component, OnInit } from '@angular/core';
import {AccountService} from '../_services/account.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-send-reset-password',
  templateUrl: './send-reset-password.component.html',
  styleUrls: ['./send-reset-password.component.css']
})
export class SendResetPasswordComponent implements OnInit {

  login = '' ;

  constructor(private accountService: AccountService,
              private router: Router) { }

  ngOnInit(): void {
  }

  send() {
    this.accountService.sendResetLink(this.login).subscribe(
        () => this.router.navigate(['/login']),
        () => {});
  }

}

interface Username {
  username: String;
}
