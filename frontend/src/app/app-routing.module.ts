import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from './accounts/register/register.component';
import {LoginComponent} from './accounts/login/login.component';
import {InformationComponent} from './profile/information/information.component';
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
import {ViewExaminationComponent} from './admin/examination/view-examination/view-examination.component';
import {NewsFeedComponent} from './newfeedall/news-feed/news-feed.component';
import {ViewTeamComponent} from './admin/team/view-team/view-team.component';
import {ViewCollectionComponent} from './admin/collection/view-collection/view-collection.component';
import {ViewExerciseComponent} from './admin/exercise/view-exercise/view-exercise.component';
import {SearchComponent} from './search/search.component';
import {TestAPIComponent} from './test-api/test-api.component';
import {TimeLineComponent} from './profile/time-line/time-line.component';
import {StoredComponent} from './profile/stored/stored.component';
import {SavedComponent} from './profile/saved/saved.component';
import {FriendComponent} from './profile/friend/friend.component';
import {AchievementsComponent} from './profile/achievements/achievements.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent, canActivate: [BeforeLoginService]},
  {path: 'login', component: LoginComponent, canActivate: [BeforeLoginService]},
  // {path: 'profile', component: TimeLineComponent},
  {path: 'request-password-reset', component: RequestResetComponent, canActivate: [BeforeLoginService]},
  {path: 'response-password-reset', component: ResponseResetComponent, canActivate: [BeforeLoginService]},
  {path: 'change-pass', component: ChangePassComponent, canActivate: [AfterLoginService]},
  {path: '', component: ExaminationComponent},
  {path: 'rank', component: RankComponent},
  {path: 'submission', component: SubmissionComponent},
  {path: 'exercise', component: ExerciseAllComponent},
  {path: 'exercise-details/:exercise', component: ExerciseDetailsComponent},
  {path: 'exercise-submit/:exercise', component: ExerciseSubmitComponent},
  {path: 'search/:keyword', component: SearchComponent},

  {path: 'profile/timeline/:id', component: TimeLineComponent},
  {path: 'profile/saved/:id', component: SavedComponent},
  {path: 'profile/stored/:id', component: StoredComponent},
  {path: 'profile/achievements/:id', component: AchievementsComponent},
  {path: 'profile/information/:id', component: InformationComponent},
  {path: 'profile/friend/:id', component: FriendComponent},


  {path: 'news-feed', component: NewsFeedComponent},

  {path: 'admin', component: TeacherAdminComponent, canActivate: [IsAdminService]},

  {path: 'admin/team/add', component: AddTeamComponent, canActivate: [IsAdminService]},
  {path: 'admin/team/edit/:team', component: EditTeamComponent, canActivate: [IsAdminService]},
  {path: 'admin/team/view', component: ViewTeamComponent, canActivate: [IsAdminService]},


  {path: 'admin/collection/add', component: AddCollectionComponent, canActivate: [IsAdminService]},
  {path: 'admin/collection/edit/:collection', component: EditCollectionComponent, canActivate: [IsAdminService]},
  {path: 'admin/collection/view', component: ViewCollectionComponent, canActivate: [IsAdminService]},


  {path: 'admin/examination/add', component: AddExaminationComponent, canActivate: [IsAdminService]},
  {path: 'admin/examination/view', component: ViewExaminationComponent, canActivate: [IsAdminService]},
  {path: 'admin/examination/edit/:examination', component: EditExaminationComponent, canActivate: [IsAdminService]},
  {path: 'admin/examinations-by-collection/view/:collection', component: ViewExaminationComponent, canActivate: [IsAdminService]},

  {path: 'admin/exercise/add', component: AddComponent},
  {path: 'admin/exercise/edit/:exercise', component: EditComponent},
  {path: 'admin/exercise/view', component: ViewExerciseComponent},
  {path: 'app-test-api', component: TestAPIComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
