import {Component, OnInit} from '@angular/core';
import {TokenService} from '../../services/token.service';
import {JarwisService} from '../../services/jarwis.service';
import {AuthService} from '../../services/auth.service';
import {Accounts} from '../../models/accounts';
import {ImgurService} from '../../services/imgur.service';
import {AccountsService} from '../../accounts/accounts.service';
import {ActivatedRoute} from '@angular/router';


declare let $: any;
@Component({
  selector: 'app-profile',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})

export class InformationComponent implements OnInit {
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


  constructor(
    private token: TokenService,
    private jwt: JarwisService,
    private auth: AuthService,
    private uploadImg: ImgurService,
    private accS: AccountsService,
    private route: ActivatedRoute,

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
    this.auth.changeMenuActive('Account');
  }



  // covertCup(code_cup: any) {
  //   if (code_cup === '0') {
  //     return 'badly';
  //   }
  //   if (code_cup === '1') {
  //     return 'child';
  //   }
  //   if (code_cup === '2') {
  //     return 'student';
  //   }
  //   if (code_cup === '3') {
  //     return 'farmer';
  //   }
  //   if (code_cup === '4') {
  //     return 'professional';
  //   }
  //   if (code_cup === '5') {
  //     return 'king';
  //   }
  //   if (code_cup === '6') {
  //     return 'god';
  //   }
  //   return 'wtf';
  // }
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
    }).subscribe(value => this.msgError = value.message);
  }
}
