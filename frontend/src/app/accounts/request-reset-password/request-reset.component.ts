import {Component, OnInit} from '@angular/core';
import {JarwisService} from '../../services/jarwis.service';
import {SnotifyService} from 'ng-snotify';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

  message = '';

  constructor(
    private jwt: JarwisService,
    private auth: AuthService
  ) {
  }

  ngOnInit() {
    this.auth.changeMenuActive('Account');
  }

  resetPass(formReset) {
    this.jwt.sendPasswordResetLink(formReset.value).subscribe(
      data => this.message = data.message,
      err => this.handleError(err)
    );
  }

  handleError(res) {
    this.message = res.error.error;
  }
}
