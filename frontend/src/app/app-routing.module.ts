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
import {ExaminationComponent} from './examinate/examination/examination.component';
import {RankComponent} from './rank/rank.component';
import {AddComponent} from './admin/exercise/add/add.component';
import {EditComponent} from './admin/exercise/edit/edit.component';
import {IsAdminService} from './services/is-admin.service';
import {ExerciseAllComponent} from './exercise/exercise-all/exercise-all.component';
import {ExerciseDetailsComponent} from './exercise/exercise-details/exercise-details.component';
import {ExerciseSubmitComponent} from './exercise/exercise-submit/exercise-submit.component';
import {SubmissionComponent} from './submit/submission/submission.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent, canActivate: [BeforeLoginService]},
  {path: 'login', component: LoginComponent, canActivate: [BeforeLoginService]},
  {path: 'profile', component: ProfileComponent, canActivate: [AfterLoginService]},
  {path: 'request-password-reset', component: RequestResetComponent, canActivate: [BeforeLoginService]},
  {path: 'response-password-reset', component: ResponseResetComponent, canActivate: [BeforeLoginService]},
  {path: 'change-pass', component: ChangePassComponent, canActivate: [AfterLoginService]},
  {path: '', component: ExaminationComponent},
  {path: 'rank', component: RankComponent},
  {path: 'submission', component: SubmissionComponent},
  {path: 'exercise', component: ExerciseAllComponent},
  {path: 'exercise-details/:exercise', component: ExerciseDetailsComponent},
  {path: 'exercise-submit/:exercise', component: ExerciseSubmitComponent},


  {path: 'admin', component: TeacherAdminComponent, canActivate: [IsAdminService]},
  {path: 'admin/team/add', component: AddTeamComponent},
  {path: 'admin/collection/add', component: AddCollectionComponent},
  {path: 'admin/examination/add', component: AddExaminationComponent},
  {path: 'admin/exercise/add', component: AddComponent},

  {path: 'admin/team/edit/:team', component: EditTeamComponent},
  {path: 'admin/collection/edit/:collection', component: EditCollectionComponent},
  {path: 'admin/examination/edit/:examination', component: EditExaminationComponent},
  {path: 'admin/exercise/edit/:exercise', component: EditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
