import {

    HttpEvent,

    HttpInterceptor,

    HttpHandler,

    HttpRequest,

    HttpResponse,

    HttpErrorResponse, HTTP_INTERCEPTORS

} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { retry, catchError } from 'rxjs/operators';
import {TokenStorageService} from '../_services/token-storage.service';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private tokenStorage: TokenStorageService,
                private  router: Router) {
    }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)

      .pipe(

        catchError((error: HttpErrorResponse) => {

          let errorMessage = '';

          if (error.error instanceof ErrorEvent) {

            // client-side error

            errorMessage = `Error: ${error.error.message}`;

          } else {
              debugger;
              if (error.status == 403 && !this.tokenStorage.getToken()) {
                  // window.location.href = 'login';
              }
              else if (error.status == 433) {
                  errorMessage = error.error.value;
                  window.alert(error.error.value);
              }
              else if (error.status == 400) {
                  this.router.navigate(['error']);
              }
              else if (error.status == 403) {
                  // window.location.href = 'noPrivileges';
              }
              else if (window.location.pathname != "/error"){
                  // window.location.href = 'error'
              }

            // server-side error

          }
          return throwError(errorMessage);

        })
      )
  }
}

export const errorInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
];

