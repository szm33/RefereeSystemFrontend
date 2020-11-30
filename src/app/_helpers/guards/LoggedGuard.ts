import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {TokenStorageService} from '../../_services/token-storage.service';
import {AuthService} from '../../_services/auth.service';


@Injectable({
    providedIn: 'root'
})
export class LoggedGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.getJwtToken() == null) {
            debugger;
            this.authService.setRedirectAfterLogin(state.url);
            this.router.navigate(['/login']);
        }
        return true;
    }
}
