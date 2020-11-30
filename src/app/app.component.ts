import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { TranslateService } from '@ngx-translate/core';
import {AuthService} from './_services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService,
              private translate: TranslateService,
              private authService: AuthService,
              private router: Router) {
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.authService.locale().subscribe(
      data => {
        console.log(data);
        this.translate.use(data.value);
      });
  }

  logout(): void {
    this.authService.logout().subscribe();
    console.log("powylogowaniu");
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
