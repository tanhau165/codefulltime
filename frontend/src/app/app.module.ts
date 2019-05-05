import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MenuComponent} from './menu/menu.component';
import {LoginComponent} from './accounts/login/login.component';
import {RegisterComponent} from './accounts/register/register.component';
import {ExaminationComponent} from './examinate/examination/examination.component';
import {FormsModule} from '@angular/forms';
import {JarwisService} from './services/jarwis.service';
import {RequestResetComponent} from './accounts/request-reset-password/request-reset.component';
import {ResponseResetComponent} from './accounts/response-reset-password/response-reset.component';
import {TokenService} from './services/token.service';
import {AuthService} from './services/auth.service';
import {AfterLoginService} from './services/after-login.service';
import {BeforeLoginService} from './services/before-login.service';
import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';
import {ChangePassComponent} from './accounts/change-pass/change-pass.component';
import {TeacherAdminComponent} from './admin/teacher-admin/teacher-admin.component';
import {AddTeamComponent} from './admin/team/add-team/add-team.component';
import {EditTeamComponent} from './admin/team/edit-team/edit-team.component';
import {AddCollectionComponent} from './admin/collection/add-collection/add-collection.component';
import {EditCollectionComponent} from './admin/collection/edit-collection/edit-collection.component';
import {AddExaminationComponent} from './admin/examination/add-examination/add-examination.component';
import {EditExaminationComponent} from './admin/examination/edit-examination/edit-examination.component';
import {RankComponent} from './rank/rank.component';
import {TopRankComponent} from './top-rank/top-rank.component';
import {ReportErroreComponent} from './report-errore/report-errore.component';
import {ExerciseRecentComponent} from './exercise/exercise-recent/exercise-recent.component';
import {ExerciseAllComponent} from './exercise/exercise-all/exercise-all.component';
import {ExerciseDetailsComponent} from './exercise/exercise-details/exercise-details.component';
import {ExerciseSubmitComponent} from './exercise/exercise-submit/exercise-submit.component';
import {SubmissionComponent} from './submit/submission/submission.component';
import {AddComponent} from './admin/exercise/add/add.component';
import {EditComponent} from './admin/exercise/edit/edit.component';
import {RecentSubmissionComponent} from './submit/recent-submission/recent-submission.component';
import {ExaminationRecentComponent} from './examinate/examination-recent/examination-recent.component';
import {CommentComponent} from './comment/comment.component';
import {TTAcountComponent} from './tooltip/ttacount/ttacount.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ViewExaminationComponent} from './admin/examination/view-examination/view-examination.component';
import {SubmissionForExerciseComponent} from './exercise/submission-for-exercise/submission-for-exercise.component';
import {NewsFeedComponent} from './newfeedall/news-feed/news-feed.component';
import {MenuAdminComponent} from './admin/menu-admin/menu-admin.component';
import {ViewTeamComponent} from './admin/team/view-team/view-team.component';
import {ViewCollectionComponent} from './admin/collection/view-collection/view-collection.component';
import {ViewExerciseComponent} from './admin/exercise/view-exercise/view-exercise.component';
import {LikeComponent} from './like/like.component';
import {SearchComponent} from './search/search.component';
import {TestAPIComponent} from './test-api/test-api.component';
import {ClearComponent} from './clear/clear.component';
import {SendComponent} from './send/send.component';
import {SaveComponent} from './save/save.component';
import {PickerModule} from '@ctrl/ngx-emoji-mart';
import {AddFriendComponent} from './friend/add-friend/add-friend.component';
import {InformationComponent} from './profile/information/information.component';
import {AchievementsComponent} from './profile/achievements/achievements.component';
import {FriendComponent} from './profile/friend/friend.component';
import {SavedComponent} from './profile/saved/saved.component';
import {TimeLineComponent} from './profile/time-line/time-line.component';
import { MenuProfileComponent } from './profile/menu-profile/menu-profile.component';
import { FriendOnlineComponent } from './profile/friend-online/friend-online.component';
import { StoredComponent } from './profile/stored/stored.component';
import { AcceptComponent } from './friend/accept/accept.component';
import { ChatComponent } from './message/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    RegisterComponent,
    ExaminationComponent,
    InformationComponent,
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
    RankComponent,
    TopRankComponent,
    ReportErroreComponent,
    ExerciseRecentComponent,
    ExerciseAllComponent,
    ExerciseDetailsComponent,
    ExerciseSubmitComponent,
    SubmissionComponent,
    AddComponent,
    EditComponent,
    RecentSubmissionComponent,
    ExaminationRecentComponent,
    CommentComponent,
    TTAcountComponent,
    ViewExaminationComponent,
    SubmissionForExerciseComponent,
    NewsFeedComponent,
    MenuAdminComponent,
    ViewTeamComponent,
    ViewCollectionComponent,
    ViewExerciseComponent,
    LikeComponent,
    SearchComponent,
    TestAPIComponent,
    ClearComponent,
    SendComponent,
    SaveComponent,
    AddFriendComponent,
    InformationComponent,
    AchievementsComponent,
    FriendComponent,
    SavedComponent,
    TimeLineComponent,
    MenuProfileComponent,
    FriendOnlineComponent,
    StoredComponent,
    AcceptComponent,
    ChatComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SnotifyModule,
    NgbModule,
    PickerModule
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
