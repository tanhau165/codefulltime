import {Component, OnInit} from '@angular/core';
import {JarwisService} from '../services/jarwis.service';
import {SnotifyService} from 'ng-snotify';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

  constructor(
    private jwt: JarwisService,
    private notify: SnotifyService
  ) {
  }

  ngOnInit() {
  }

  resetPass(formReset) {
    this.jwt.sendPasswordResetLink(formReset.value).subscribe(
      data => console.log(data),
      err => this.notify.error(err)
    );
  }

  handleResponse(res) {

  }
}
