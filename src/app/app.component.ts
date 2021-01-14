import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TokenStorageService} from './_services/token-storage.service';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from './_services/auth.service';
import {Router} from '@angular/router';
import {DictionaryService} from './_services/dictionary.service';
import {Location} from '@angular/common';
import {DateAdapter} from '@angular/material/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {

    constructor(private tokenStorageService: TokenStorageService,
                private translate: TranslateService,
                private authService: AuthService,
                private router: Router,
                private dictionaryService: DictionaryService,
                private location: Location,
                private _adapter: DateAdapter<any>) {
        translate.setDefaultLang('en');
    }

    ngOnInit(): void {
        const userLang = navigator.language;
        this.translate.use(userLang);
        this._adapter.setLocale(userLang);
        // this.authService.locale().subscribe(
        //     data => {
        //         console.log(data);
        //         this.translate.use(data.value);
        //     });
        this.dictionaryService.getDictionaries();

    }

    logout(): void {
        this.authService.logout().subscribe(
            () => {
            }, () => {}
        );
        this.authService.doLogoutUser();
        this.router.navigate(['/login']);
    }

    back() {
        this.location.back();
    }

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }
}
