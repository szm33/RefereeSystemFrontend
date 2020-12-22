import {

    HttpEvent,

    HttpInterceptor,

    HttpHandler,

    HttpRequest,

    HttpErrorResponse, HTTP_INTERCEPTORS

} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { retry, catchError } from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../_services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService,
                private  router: Router) {
    }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)

      .pipe(

        catchError((error: HttpErrorResponse) => {
            console.log("z handlera");
            console.log(error);

          let errorMessage = '';


          if (error.error instanceof ErrorEvent) {

            // client-side error

          } else {
              if (error.status == 433) {
                  window.alert(error.error.value);
              }
              else if (error.status == 403) {
                  // this.authService.removeJwtToken();
                  this.router.navigate(['noPrivileges']);
              }
              else if (error.status == 400) {
                  this.router.navigate(['error']);
              }
              else if (window.location.pathname != "/error"){
                  // window.location.href = 'error'
              }

            // server-side error

          }
          return throwError(error);

        })
      )
  }
}

export const errorInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
];

