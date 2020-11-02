import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

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
import { AccountDetailsComponent } from './account-details/account-details.component';
import { TeamComponent } from './team/team.component';
import { TeamModalComponent } from './team-modal/team-modal.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SendResetPasswordComponent } from './send-reset-password/send-reset-password.component';
import { TeamEditComponent } from './team-edit/team-edit.component';
import { MatchComponent } from './match/match.component';
import { MatchCreateComponent } from './match-create/match-create.component';
import { MatchDetailsComponent } from './match-details/match-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    RefereeComponent,
    RefereeModalComponent,
    ErrorComponent,
    PrivilegesComponent,
    RefereeDetailsComponent,
    RefereeModifyComponent,
    AccountDetailsComponent,
    TeamComponent,
    TeamModalComponent,
    ResetPasswordComponent,
    SendResetPasswordComponent,
    TeamEditComponent,
    MatchComponent,
    MatchCreateComponent,
    MatchDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [authInterceptorProviders, errorInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

