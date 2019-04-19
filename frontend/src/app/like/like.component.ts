import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {LikeService} from './like.service';
import {TokenService} from '../services/token.service';
import {JarwisService} from '../services/jarwis.service';
import {Accounts} from '../models/accounts';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {

  @Input() code_object: string;

  number_of_like: number;
  is_like: boolean;
  accounts: Accounts[] = [];

  changeCodeObject(code_object) {
    this.code_object = code_object;
    this.accounts = [];
    this.likeS.isLkie(this.token.get(), this.code_object).subscribe(
      res => {
        if (res.status === 1) {
          this.is_like = true;
          this.number_of_like = res.number_of_like;
          res.accounts.forEach(a => this.accounts.push(new Accounts(a)));

        } else {
          this.is_like = false;
          this.number_of_like = res.number_of_like;
          res.accounts.forEach(a => this.accounts.push(new Accounts(a)));
        }
      }
    );
  }

  constructor(
    private auth: AuthService,
    private likeS: LikeService,
    private token: TokenService,
  ) {
  }


  ngOnInit() {
    this.accounts = [];
    this.likeS.isLkie(this.token.get(), this.code_object).subscribe(
      res => {
        if (res.status === 1) {
          this.is_like = true;
          this.number_of_like = res.number_of_like;
          res.accounts.forEach(a => this.accounts.push(new Accounts(a)));

        } else {
          this.is_like = false;
          this.number_of_like = res.number_of_like;
          res.accounts.forEach(a => this.accounts.push(new Accounts(a)));
        }
      }
    );
  }

  clickLike() {
    this.accounts = [];
    this.likeS.addLike(this.token.get(), this.code_object).subscribe(
      res => {
        if (res.status === 1) {
          this.is_like = true;
          this.number_of_like = res.number_of_like;
          res.accounts.forEach(a => this.accounts.push(new Accounts(a)));
        } else {
          this.is_like = false;
          this.number_of_like = res.number_of_like;
          res.accounts.forEach(a => this.accounts.push(new Accounts(a)));
        }
      }
    );
  }
}
