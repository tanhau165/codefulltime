import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from './acc-register/register.component';
import {LoginComponent} from './acc-login/login.component';
import {ExaminationComponent} from './examination/examination.component';
import {ProfileComponent} from './acc-profile/profile.component';
import {BeforeLoginService} from './services/before-login.service';
import {AfterLoginService} from './services/after-login.service';
import {RequestResetComponent} from './acc-request-reset-password/request-reset.component';
import {ResponseResetComponent} from './acc-response-reset-password/response-reset.component';
import {ChangePassComponent} from './acc-change-pass/change-pass.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent, canActivate: [BeforeLoginService]},
  {path: 'login', component: LoginComponent, canActivate: [BeforeLoginService]},
  {path: 'profile', component: ProfileComponent, canActivate: [AfterLoginService]},
  {path: 'request-password-reset', component: RequestResetComponent, canActivate: [BeforeLoginService]},
  {path: 'response-password-reset', component: ResponseResetComponent, canActivate: [BeforeLoginService]},
  {path: 'change-pass', component: ChangePassComponent, canActivate: [AfterLoginService]},
  {path: '', component: ExaminationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
