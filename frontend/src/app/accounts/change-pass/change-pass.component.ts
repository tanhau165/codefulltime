import {Component, OnInit} from '@angular/core';
import {JarwisService} from '../../services/jarwis.service';
import {TokenService} from '../../services/token.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {


  constructor(
    private jwt: JarwisService,
    private token: TokenService
  ) {
  }

  username = null;
  oldPassword = null;
  newPassword = null;
  message: any;

  ngOnInit() {
  }

  changePass(formChangePass) {
    this.oldPassword = formChangePass.value.old_password;
    this.newPassword = formChangePass.value.password;

    this.jwt.me(this.token.get()).subscribe(
      data => {
        this.username = data.username;
        this.jwt.changePass({
          username: this.username,
          password: this.oldPassword,
          new_password: this.newPassword
        }, this.token.get()).subscribe(data1 => {

            if (data1.status === 'Success') {
              this.message = 'Change password successfully !';
            }
          },
          err => this.handleError(err)
        );
      },
      error => {
        this.handleError(error);
      }
    );
  }

  handleError(error: HttpErrorResponse) {
    if (error.error.status === 'ErrorOldPass') {
      this.message = 'Old password not match current pass';
    }
  }
}
