import {Component, OnInit, ViewChild} from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import {Account} from '../model/account';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: Account = new Account();
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  username = '';

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private  router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.username = this.tokenStorage.getUser();
    }
  }

  login(): void {
    this.authService.login({username: this.form.username, password: this.form.password}).subscribe(
      data => {
        console.log(data);
        if (data) {
          this.isLoginFailed = false;
          if (this.authService.getRedirectAfterLogin()) {
            this.router.navigate([this.authService.getRedirectAfterLogin()]);
            this.authService.setRedirectAfterLogin(null);
          }
          else {
            this.router.navigate(["home"]);
          }
        }
        else {
          this.isLoginFailed = true;
        }
      }
  );

  }


  reloadPage(): void {
    window.location.reload();
  }
}


