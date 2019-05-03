import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AccountsService} from '../../accounts/accounts.service';
import {JarwisService} from '../../services/jarwis.service';
import {TokenService} from '../../services/token.service';
import {Accounts} from '../../models/accounts';

@Component({
  selector: 'app-menu-profile',
  templateUrl: './menu-profile.component.html',
  styleUrls: ['./menu-profile.component.css']
})
export class MenuProfileComponent implements OnInit {

  @Input() active: string;

  currentAccount: Accounts;
  // currentAccountID: string;
  // avatar: string;
  // name: string;
  isOwner = false;

  constructor(
    private route: ActivatedRoute,
    private accS: AccountsService,
    private jwt: JarwisService,
    private token: TokenService
  ) {
    this.isOwner = false;
  }

  ngOnInit() {

    this.route.paramMap.subscribe(value => {
      const id = value.get('id');
      this.jwt.me(this.token.get()).subscribe(
        data => {
          this.isOwner = id === data.id;
        }
      );
      this.accS.getUserByID(id).subscribe(
        data2 => {
          this.currentAccount = new Accounts(data2.account);
        });
    });
  }

// changeAvatar(avatar: FileList) {
  //   const reader = new FileReader();
  //   reader.onload = (e: any) => {
  //     this.linkNew = e.target.result;
  //   };
  //   this.avatarReview = avatar[0];
  //   reader.readAsDataURL(avatar[0]);
  //   this.avatarReady = true;
  //
  // }
  //
  // saveAvatar() {
  //
  //   this.ulS.uploadAvatar(this.avatarReview, this.token.get()).subscribe(res => {
  //     this.accS.changeAvatar(this.token.get(), res.link).subscribe(value => {
  //       this.msgError = value.message;
  //       this.avatarReady = false;
  //       this.linkNew = res.link;
  //       setTimeout(() => this.msgError = '', 2000);
  //     });
  //   });
  //
  //
  // }
}
