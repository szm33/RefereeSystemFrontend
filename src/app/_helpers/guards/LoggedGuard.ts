import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {TokenStorageService} from '../../_services/token-storage.service';
import {AuthService} from '../../_services/auth.service';


@Injectable({
    providedIn: 'root'
})
export class LoggedGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate() {
        if (this.authService.getJwtToken() == null) {
            this.router.navigate(['/login']);
        }
        return true;
    }
}
