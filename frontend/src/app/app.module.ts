import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MenuComponent} from './menu/menu.component';
import {LoginComponent} from './acc-login/login.component';
import {RegisterComponent} from './acc-register/register.component';
import {ExaminationComponent} from './examination/examination.component';
import {FormsModule} from '@angular/forms';
import {JarwisService} from './services/jarwis.service';
import {ProfileComponent} from './acc-profile/profile.component';
import {RequestResetComponent} from './acc-request-reset-password/request-reset.component';
import {ResponseResetComponent} from './acc-response-reset-password/response-reset.component';
import {TokenService} from './services/token.service';
import {AuthService} from './services/auth.service';
import {AfterLoginService} from './services/after-login.service';
import {BeforeLoginService} from './services/before-login.service';
import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';
import { ChangePassComponent } from './acc-change-pass/change-pass.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    RegisterComponent,
    ExaminationComponent,
    ProfileComponent,
    RequestResetComponent,
    ResponseResetComponent,
    ChangePassComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SnotifyModule,

  ],
  providers: [
    JarwisService,
    TokenService,
    AuthService,
    AfterLoginService,
    BeforeLoginService,
    {provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
