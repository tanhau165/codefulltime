import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from './accounts/register/register.component';
import {LoginComponent} from './accounts/login/login.component';
import {ProfileComponent} from './accounts/profile/profile.component';
import {BeforeLoginService} from './services/before-login.service';
import {AfterLoginService} from './services/after-login.service';
import {RequestResetComponent} from './accounts/request-reset-password/request-reset.component';
import {ResponseResetComponent} from './accounts/response-reset-password/response-reset.component';
import {ChangePassComponent} from './accounts/change-pass/change-pass.component';
import {TeacherAdminComponent} from './admin/teacher-admin/teacher-admin.component';
import {AddTeamComponent} from './admin/team/add-team/add-team.component';
import {AddCollectionComponent} from './admin/collection/add-collection/add-collection.component';
import {AddExaminationComponent} from './admin/examination/add-examination/add-examination.component';
import {EditTeamComponent} from './admin/team/edit-team/edit-team.component';
import {EditCollectionComponent} from './admin/collection/edit-collection/edit-collection.component';
import {EditExaminationComponent} from './admin/examination/edit-examination/edit-examination.component';
import {ExaminationComponent} from './examination/examination.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent, canActivate: [BeforeLoginService]},
  {path: 'login', component: LoginComponent, canActivate: [BeforeLoginService]},
  {path: 'profile', component: ProfileComponent, canActivate: [AfterLoginService]},
  {path: 'request-password-reset', component: RequestResetComponent, canActivate: [BeforeLoginService]},
  {path: 'response-password-reset', component: ResponseResetComponent, canActivate: [BeforeLoginService]},
  {path: 'change-pass', component: ChangePassComponent, canActivate: [AfterLoginService]},
  {path: '', component: ExaminationComponent},


  {path: 'admin', component: TeacherAdminComponent},
  {path: 'admin/team/add', component: AddTeamComponent},
  {path: 'admin/collection/add', component: AddCollectionComponent},
  {path: 'admin/examination/add', component: AddExaminationComponent},

  {path: 'admin/team/edit/:team', component: EditTeamComponent},
  {path: 'admin/collection/edit/:collection', component: EditCollectionComponent},
  {path: 'admin/examination/edit/:examination', component: EditExaminationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
