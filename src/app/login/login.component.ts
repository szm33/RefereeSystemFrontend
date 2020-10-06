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
    debugger;
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.username = this.tokenStorage.getUser();
      debugger;
    }
  }

  login(): void {
    this.authService.login(this.form).subscribe(
      data => {
        console.log(data);
        debugger;
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data.username);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.username = data.username;
        this.router.navigate(["home"]);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
  );
    console.log(this.tokenStorage.getToken());

  }


  reloadPage(): void {
    window.location.reload();
  }
}


