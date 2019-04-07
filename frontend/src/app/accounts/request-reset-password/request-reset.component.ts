import {Component, OnInit} from '@angular/core';
import {JarwisService} from '../../services/jarwis.service';
import {SnotifyService} from 'ng-snotify';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

  message = '';

  constructor(
    private jwt: JarwisService
  ) {
  }

  ngOnInit() {
  }

  resetPass(formReset) {
    this.jwt.sendPasswordResetLink(formReset.value).subscribe(
      data => this.message = data.data,
      err => this.handleError(err)
    );
  }

  handleError(res) {
    this.message = res.error.error;
  }
}
