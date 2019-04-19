import {Component, OnInit} from '@angular/core';
import {TokenService} from '../../services/token.service';
import {JarwisService} from '../../services/jarwis.service';
import {AuthService} from '../../services/auth.service';
import {Accounts} from '../../models/accounts';
import {ImgurService} from '../../services/imgur.service';
import {AccountsService} from '../accounts.service';
import {ActivatedRoute} from '@angular/router';
import {SubmissionService} from '../../submit/submission.service';
import {ExerciseService} from '../../admin/exercise/exercise.service';
import {UploadFileService} from '../../services/upload-file.service';
import {ConfigService} from '../../services/config.service';

declare let $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
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
      if (id !== null) {
        this.jwt.me(this.token.get()).subscribe(
          data => {
            this.isOwner = true;
            if (data.id === id) {
              this.account = data;
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
              this.linkNew =  data.avatar;
              this.loadSubmission(this.account.id);
              this.loadQuestionAnswer(this.account.id);
              this.loadExerciseSubmittedByID(this.account.id);

            } else {
              this.isOwner = false;
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
                  this.loadSubmission(this.account.id);
                  this.loadQuestionAnswer(this.account.id);
                  this.loadExerciseSubmittedByID(this.account.id);
                },
                error1 => console.log(error1)
              );
            }
          },
          error1 => {
            this.isOwner = false;
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
                this.loadSubmission(this.account.id);
                this.loadQuestionAnswer(this.account.id);
                this.loadExerciseSubmittedByID(this.account.id);
              },
              err => console.log(err)
            );
          }
        );
      } else {
        this.jwt.me(this.token.get()).subscribe(
          data => {
            this.account = data;
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
            this.isOwner = true;
            this.loadSubmission(this.account.id);
            this.loadQuestionAnswer(this.account.id);
            this.loadExerciseSubmittedByID(this.account.id);
          }
        );
      }
    });
    this.auth.changeMenuActive('Account');
  }

  loadSubmission(id) {
    this.smS.getById(id).subscribe(
      val => {
        val.submissions.forEach(submit => {
          this.submission.push(submit);
        });
        $(document).ready(() => {
          $('#example').DataTable();
        });
      }
    );
  }

  loadQuestionAnswer(id) {
    this.smS.getQuestionAnswer(id).subscribe(
      val => {
        val.examinations.forEach(submit => {
          this.examinations.push(submit);
        });
        $(document).ready(() => {
          $('#example1').DataTable();
        });
      }
    );
  }

  loadExerciseSubmittedByID(id) {
    this.exS.getExerciseSubmittedByID(id).subscribe(
      val => {
        val.exercises.forEach(e => {
          this.exercises.push(e);
        });
        $(document).ready(() => {
          $('#example2').DataTable();
        });
      }
    );
  }

  changeAvatar(avatar: FileList) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.linkNew = e.target.result;
    };
    this.avatarReview = avatar[0];
    reader.readAsDataURL(avatar[0]);
    this.avatarReady = true;

  }

  saveAvatar() {

    this.ulS.uploadAvatar(this.avatarReview, this.token.get()).subscribe(res => {
      this.accS.changeAvatar(this.token.get(), res.link).subscribe(value => {
        this.msgError = value.message;
        this.avatarReady = false;
        this.linkNew = res.link;
        setTimeout(() => this.msgError = '', 2000);
      });
    });


  }

  covertCup(code_cup: any) {
    if (code_cup === '1') {
      return 'child';
    }
    if (code_cup === '2') {
      return 'student';
    }
    if (code_cup === '3') {
      return 'farmer';
    }
    if (code_cup === '4') {
      return 'professional';
    }
    if (code_cup === '5') {
      return 'king';
    }
    return 'god';
  }

  updateProfile() {
    this.accS.changeInfo(this.token.get(), {
      name: this.name,
      birth_day: this.birth_day,
      number_phone: this.number_phone,
      address: this.address,
      strengths: this.strengths,
      hobby: this.hobby,
      skill: this.skill,
      project: this.project,
    }).subscribe(value => console.log(value));
  }
}
