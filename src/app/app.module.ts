import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { errorInterceptorProviders } from './_helpers/error.interceptor';
import { RefereeComponent } from './referee/referee.component';
import { RefereeModalComponent } from './referee-modal/referee-modal.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ErrorComponent } from './error/error.component';
import { PrivilegesComponent } from './privileges/privileges.component';
import { RefereeDetailsComponent } from './referee-details/referee-details.component';
import { RefereeModifyComponent } from './referee-modify/referee-modify.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardUserComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    RefereeComponent,
    RefereeModalComponent,
    ErrorComponent,
    PrivilegesComponent,
    RefereeDetailsComponent,
    RefereeModifyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [authInterceptorProviders, errorInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

