import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from '@angular/router';
import {JarwisService} from '../services/jarwis.service';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private jwt: JarwisService
  ) {
  }

  token = null;

  ngOnInit() {
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
      res => console.log(res),
      err => console.log(err)
    );
  }
}