import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../../_services/auth.service';


@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate() {
        if (this.authService.getJwtToken() == null) {
            this.router.navigate(['/login']);
        }
        else if (this.authService.isAdmin()) {
            return true;
        }
        return false;
    }
}
