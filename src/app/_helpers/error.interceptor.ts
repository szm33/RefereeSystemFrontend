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

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private tokenStorage: TokenStorageService) {
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
                  window.location.href = 'login';
              }
              else if (error.status == 403) {
                  window.location.href = 'noPrivileges';
              }
              else if (window.location.pathname != "/error"){
                  // window.location.href = 'error'
              }

            // server-side error

          }

          if(errorMessage != '') {
              window.alert(errorMessage);
          }
          return throwError(errorMessage);

        })
      )
  }
}

export const errorInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
];

