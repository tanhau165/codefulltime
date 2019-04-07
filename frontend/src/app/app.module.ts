import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MenuComponent} from './menu/menu.component';
import {LoginComponent} from './accounts/login/login.component';
import {RegisterComponent} from './accounts/register/register.component';
import {ExaminationComponent} from './examination/examination.component';
import {FormsModule} from '@angular/forms';
import {JarwisService} from './services/jarwis.service';
import {ProfileComponent} from './accounts/profile/profile.component';
import {RequestResetComponent} from './accounts/request-reset-password/request-reset.component';
import {ResponseResetComponent} from './accounts/response-reset-password/response-reset.component';
import {TokenService} from './services/token.service';
import {AuthService} from './services/auth.service';
import {AfterLoginService} from './services/after-login.service';
import {BeforeLoginService} from './services/before-login.service';
import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';
import {ChangePassComponent} from './accounts/change-pass/change-pass.component';
import {TeacherAdminComponent} from './admin/teacher-admin/teacher-admin.component';
import { AddTeamComponent } from './admin/team/add-team/add-team.component';
import { EditTeamComponent } from './admin/team/edit-team/edit-team.component';
import { AddCollectionComponent } from './admin/collection/add-collection/add-collection.component';
import { EditCollectionComponent } from './admin/collection/edit-collection/edit-collection.component';
import { AddExaminationComponent } from './admin/examination/add-examination/add-examination.component';
import { EditExaminationComponent } from './admin/examination/edit-examination/edit-examination.component';

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
    TeacherAdminComponent,
    AddTeamComponent,
    EditTeamComponent,
    AddCollectionComponent,
    EditCollectionComponent,
    AddExaminationComponent,
    EditExaminationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SnotifyModule
  ],
  providers: [
    JarwisService,
    TokenService,
    AuthService,
    AfterLoginService,
    BeforeLoginService,
    {provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
