import {Component, Input, OnInit} from '@angular/core';
import {ProfileService} from '../profile.service';
import {Accounts} from '../../models/accounts';
import {TokenService} from '../../services/token.service';
import {JarwisService} from '../../services/jarwis.service';
import {AuthService} from '../../services/auth.service';
import {ImgurService} from '../../services/imgur.service';
import {AccountsService} from '../../accounts/accounts.service';
import {ActivatedRoute} from '@angular/router';
import {SubmissionService} from '../../submit/submission.service';
import {ExerciseService} from '../../admin/exercise/exercise.service';
import {UploadFileService} from '../../services/upload-file.service';

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.css']
})
export class TimeLineComponent implements OnInit {

  account: Accounts;
  avatarReady = false;
  avatarReview: any;
  linkNew: string;

  msgError: string;
  name: string;
  birth_day: string;
  number_phone: string;
  address: string;
  strengths: string;
  hobby: string;
  skill: string;
  project: string;
  social: string;
  website: string;
  work_in_week: string;
  sex: string;
  specialize: string;
  more_information: string;
  isOwner: any;
  submission: any[] = [];
  exercises: any[] = [];
  examinations: any[] = [];

  constructor(
    private proS: ProfileService,
    private token: TokenService,
    private jwt: JarwisService,
    private auth: AuthService,
    private uploadImg: ImgurService,
    private accS: AccountsService,
    private route: ActivatedRoute,
    private smS: SubmissionService,
    private exS: ExerciseService,
    private ulS: UploadFileService,
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(value => {
      const id = value.get('id');
      this.jwt.me(this.token.get()).subscribe(
        data => {
          this.isOwner = id === data.id;
          this.accS.getUserByID(id).subscribe(
            data2 => {
              this.account = data2.account;
              this.name = this.account.name;
              this.birth_day = this.account.birth_day;
              this.number_phone = this.account.number_phone;
              this.address = this.account.address;
              this.strengths = this.account.strengths;
              this.hobby = this.account.hobby;
              this.skill = this.account.skill;
              this.project = this.account.project;
              this.social = this.account.social;
              this.website = this.account.website;
              this.work_in_week = this.account.work_in_week;
              this.sex = this.account.sex;
              this.specialize = this.account.specialize;
              this.more_information = this.account.more_information;
              this.linkNew = this.account.avatar;
            },
            error1 => console.log(error1)
          );
        }
      );
    });
  }

}
