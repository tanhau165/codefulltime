import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from '@angular/router';
import {JarwisService} from '../../services/jarwis.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private jwt: JarwisService,
    private auth: AuthService
  ) {
  }

  token = null;
  message: any;

  ngOnInit() {
    this.auth.changeMenuActive('Account');
    this.route.queryParams.subscribe(param => {
      this.token = param.token;
    });
  }

  createNewPass(formNewPass) {
    this.jwt.resetPassword({
      email: formNewPass.value.email,
      password: formNewPass.value.password,
      password_confirmation: formNewPass.value.password_confirmation,
      resetToken: this.token
    }).subscribe(
      res => this.message = res.message,
      err => this.handleError(err)
    );
  }

  handleError(res) {
    this.message = res.error.error;
  }
}
