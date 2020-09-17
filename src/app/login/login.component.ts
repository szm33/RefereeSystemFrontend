import {Component, OnInit, ViewChild} from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  refereeField: any = {};
  username = '';

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    debugger;
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.username = this.tokenStorage.getUser();
      debugger;
    }
  }

  referee(): void {
    this.authService.referee().subscribe(
      data => {this.refereeField = data;
        console.log(data);
      }
      );
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
        this.reloadPage();
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


