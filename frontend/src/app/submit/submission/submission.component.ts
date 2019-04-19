import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {SubmissionService} from '../submission.service';
declare let $: any;
@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit {

  submissions: any[] = [];

  constructor(
    private smS: SubmissionService,
    private auth: AuthService
  ) {
  }

  ngOnInit() {
    this.auth.changeMenuActive('Submission');
    this.smS.getAll().subscribe(res => {
        res.submissions.forEach((v) => {
          this.submissions.push(v);
        });
        $(document).ready(() => {
          $('#example').DataTable();
        });
      },
      error => {
      }
    );
  }

}
