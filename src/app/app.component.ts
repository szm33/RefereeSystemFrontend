import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from './_services/token-storage.service';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from './_services/auth.service';
import {Router} from '@angular/router';
import {DictionaryService} from './_services/dictionary.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(private tokenStorageService: TokenStorageService,
                private translate: TranslateService,
                private authService: AuthService,
                private router: Router,
                private dictionaryService: DictionaryService) {
        translate.setDefaultLang('en');
    }

    ngOnInit(): void {
        this.authService.locale().subscribe(
            data => {
                console.log(data);
                this.translate.use(data.value);
            });
        this.dictionaryService.getDictionaries();

    }

    logout(): void {
        this.authService.logout().subscribe(
            () => {
                this.authService.doLogoutUser();
                this.router.navigate(['/login']);
            }, () => window.alert('Failed logout')
        );
    }

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }
}
