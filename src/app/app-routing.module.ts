
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {RefereeComponent} from './referee/referee.component';
import {ErrorComponent} from './error/error.component';
import {PrivilegesComponent} from './privileges/privileges.component';
import {RefereeDetailsComponent} from './referee-details/referee-details.component';
import {AccountDetailsComponent} from './account-details/account-details.component';
import {TeamComponent} from './team/team.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {SendResetPasswordComponent} from './send-reset-password/send-reset-password.component';
import {TeamEditComponent} from './team-edit/team-edit.component';
import {MatchCreateComponent} from './match-create/match-create.component';
import {AllMatchComponent} from './all-match/all-match.component';
import {RefereeMatchesComponent} from './referee-matches/referee-matches.component';
import {MatchModifyComponent} from './match-modify/match-modify.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'referee', component: RefereeComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'noPrivileges', component: PrivilegesComponent },
  { path: 'account', component: AccountDetailsComponent },
  { path: 'team', component: TeamComponent },
  { path: 'team/:id', component: TeamEditComponent },
  { path: 'match', component: AllMatchComponent },
  { path: 'match/modify/:id', component: MatchModifyComponent },
  { path: 'match/referee/:id', component: RefereeMatchesComponent },
  { path: 'match/create', component: MatchCreateComponent },
  { path: 'reset', component: SendResetPasswordComponent },
  { path: 'reset/:link', component: ResetPasswordComponent },
  { path: 'referee/:id', component: RefereeDetailsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
