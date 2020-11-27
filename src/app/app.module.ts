import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { errorInterceptorProviders } from './_helpers/error.interceptor';
import { RefereeComponent } from './referee/referee.component';
import { RefereeModalComponent } from './referee-modal/referee-modal.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
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
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import { AllMatchComponent } from './all-match/all-match.component';
import { RefereeMatchesComponent } from './referee-matches/referee-matches.component';
import { MatchModifyComponent } from './match-modify/match-modify.component';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {MatSelectModule} from '@angular/material/select';
import { ArrivalTimePickerComponent } from './arrival-time-picker/arrival-time-picker.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {TokenInterceptor} from './_helpers/token.interceptor';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export const DateFormats = {
  parse: {
    dateInput: ['YYYY-MM-DD']
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
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
    MatchDetailsComponent,
    AllMatchComponent,
    RefereeMatchesComponent,
    MatchModifyComponent,
    ArrivalTimePickerComponent,
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
    MatSelectModule,
    NgxMaterialTimepickerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }
  , errorInterceptorProviders,
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: DateFormats }],
  bootstrap: [AppComponent]
})
export class AppModule { }
